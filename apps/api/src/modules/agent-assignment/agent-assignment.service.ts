import { prisma, Role } from '@zagotours/database';

/**
 * Service for assigning requests to agents when users don't have a referrer
 * Implements round-robin assignment to distribute load evenly
 */
export class AgentAssignmentService {
  /**
   * Get available agents for assignment
   * Returns agents who are active and can handle requests
   */
  private async getAvailableAgents(): Promise<string[]> {
    const agents = await prisma.user.findMany({
      where: {
        role: {
          in: [Role.INDEPENDENT_AGENT, Role.COOPERATE_AGENT],
        },
        status: 'ACTIVE',
      },
      select: {
        id: true,
        _count: {
          select: {
            assignedTripRequests: true,
            assignedCallbackRequests: true,
          },
        },
      },
      orderBy: [
        // Order by least assigned requests (round-robin)
        {
          assignedTripRequests: {
            _count: 'asc',
          },
        },
        {
          assignedCallbackRequests: {
            _count: 'asc',
          },
        },
      ],
    });

    return agents.map((agent) => agent.id);
  }

  /**
   * Auto-assign an agent using round-robin
   * Returns the agent ID or null if no agents available
   */
  async autoAssignAgent(): Promise<string | null> {
    const availableAgents = await this.getAvailableAgents();

    if (availableAgents.length === 0) {
      console.warn('No available agents for assignment');
      return null;
    }

    // Return the agent with the least assignments (first in sorted list)
    return availableAgents[0] ?? null;
  }

  /**
   * Get list of agents for manual selection
   * Returns agents with their details for UI display
   */
  async getAgentsForSelection() {
    const agents = await prisma.user.findMany({
      where: {
        role: {
          in: [Role.INDEPENDENT_AGENT, Role.COOPERATE_AGENT],
        },
        status: 'ACTIVE',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        independentDetails: {
          select: {
            certifications: true,
          },
        },
        cooperateDetails: {
          select: {
            companyName: true,
          },
        },
        _count: {
          select: {
            assignedTripRequests: true,
            assignedCallbackRequests: true,
            agentCalls: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return agents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      email: agent.email,
      role: agent.role,
      companyName: agent.cooperateDetails?.companyName,
      certifications: agent.independentDetails?.certifications,
      activeRequests:
        agent._count.assignedTripRequests +
        agent._count.assignedCallbackRequests,
      totalCalls: agent._count.agentCalls,
    }));
  }

  /**
   * Validate that an agent exists and is active
   */
  async validateAgent(agentId: string): Promise<boolean> {
    const agent = await prisma.user.findFirst({
      where: {
        id: agentId,
        role: {
          in: [Role.INDEPENDENT_AGENT, Role.COOPERATE_AGENT],
        },
        status: 'ACTIVE',
      },
    });

    return !!agent;
  }

  /**
   * Get agent assignment statistics
   * Useful for admin dashboard
   */
  async getAssignmentStats() {
    const agents = await prisma.user.findMany({
      where: {
        role: {
          in: [Role.INDEPENDENT_AGENT, Role.COOPERATE_AGENT],
        },
      },
      select: {
        id: true,
        name: true,
        role: true,
        status: true,
        _count: {
          select: {
            assignedTripRequests: true,
            assignedCallbackRequests: true,
            agentCalls: true,
          },
        },
      },
    });

    return agents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      status: agent.status,
      assignedTripRequests: agent._count.assignedTripRequests,
      assignedCallbacks: agent._count.assignedCallbackRequests,
      totalCalls: agent._count.agentCalls,
      totalAssignments:
        agent._count.assignedTripRequests +
        agent._count.assignedCallbackRequests +
        agent._count.agentCalls,
    }));
  }
}
