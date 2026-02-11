import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  Separator,
} from '@chakra-ui/react';

export default function PrivacyPolicy() {
  return (
    <Box bg='gray.50' minH='100vh' py={{ base: 8, md: 16 }}>
      <Container maxW='4xl'>
        <VStack gap={8} align='stretch'>
          {/* Header */}
          <Box textAlign='center'>
            <Heading
              as='h1'
              fontSize={{ base: '2xl', md: '4xl' }}
              color='primary'
              mb={2}
            >
              PRIVACY POLICY
            </Heading>
            <Text color='gray.600' fontSize={{ base: 'sm', md: 'md' }}>
              Last updated: February 11, 2026
            </Text>
          </Box>

          <Separator />

          {/* Content */}
          <Box bg='white' p={{ base: 6, md: 10 }} borderRadius='xl' shadow='sm'>
            <VStack gap={6} align='stretch'>
              {/* Introduction */}
              <Box>
                <Text color='gray.700' lineHeight='tall'>
                  Your privacy is extremely important to us. We have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
                </Text>
              </Box>

              {/* Data Collection Sections */}
              <Box>
                <Heading as='h3' fontSize='xl' color='gray.800' mb={3}>How We Collect Data</Heading>
                
                <Box mb={4}>
                  <Text fontWeight="bold">Reviews</Text>
                  <Text color='gray.700'>What we collect:</Text>
                  <Text color='gray.700' ml={4}>
                    Reviewer’s e-mail address<br />
                    Reviewer’s name (optional)<br />
                    Reviewer’s website (optional)<br />
                    Product/trip (optional)
                  </Text>
                  <Text color='gray.700' mt={2}>How we use it:</Text>
                  <Text color='gray.700'>
                    We do not sell or market to your email address when you write a review. When you write a review, you opt-in for our newsletter which we send twice a month.
                  </Text>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="bold">Newsletter</Text>
                  <Text color='gray.700'>What we collect:</Text>
                  <Text color='gray.700' ml={4}>
                    E-mail address<br />
                    Name (optional)
                  </Text>
                  <Text color='gray.700' mt={2}>How we use it:</Text>
                  <Text color='gray.700'>
                    When you opt in to our newsletter, you are added to our newsletter list. We send out our articles, news, and other updates we believe are relevant. We may send emails on behalf of third parties, however, your email address/name is never shared.
                    Reviews—which may be shared or reproduced by third parties—however, your email address and name are not shared, nor is any identifying information.
                  </Text>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="bold">Cookies</Text>
                  <Text color='gray.700'>What we collect:</Text>
                  <Text color='gray.700'>Zippa Marketing uses cookies on our website.</Text>
                  <Text color='gray.700' mt={2}>How we use it:</Text>
                  <Text color='gray.700'>
                    Cookies are small text files that can be used by web sites to make a user’s experience more efficient. We use cookies to help us measure the popularity of the site, different pages and visitor navigation so we can continue to improve and change the site based on usage. Cookies also help us personalize your experience based on your location and past Zippa Marketing website interactions. By using our site, you accept the usage of cookies.
                    If you wish to use our site without cookies or want to know more about them, visit AboutCookies.org.
                    We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained.
                  </Text>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="bold">Webinar</Text>
                  <Text color='gray.700'>What we collect:</Text>
                  <Text color='gray.700' ml={4}>
                    E-mail<br />
                    Name<br />
                    Phone number (optional)
                  </Text>
                  <Text color='gray.700' mt={2}>How we use it:</Text>
                  <Text color='gray.700'>
                    We collect your name, phone, and email in order to send you reminders and any follow-up information regarding the webinar you signed up for. Currently our webinar presenters will also have access to the information you provide (only name and email). If you'd like more information on how the webinar sponsor will use your information, please reach out to their organization directly.
                    When you sign up for a webinar, you will also be added to the Zippa Marketing Newsletter list. If you'd like to retract your name and information for a webinar:
                    Please email us if you'd like your information removed from a webinar. If you have already attended the webinar, and would like to remove your information from a third-party sponsor list, please reach out to that organization directly.
                  </Text>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="bold">Public Information</Text>
                  <Text color='gray.700'>
                    We use Facebook Comments to allow users to comment on blog posts and pages. These comments are public and may be read, collected and used by anyone. You are able to delete your own comment or, if you’d like us to remove it for you, please contact Zippa Marketing
                  </Text>
                </Box>

                <Box mb={4}>
                  <Text fontWeight="bold">Embedded Content From Other Websites</Text>
                  <Text color='gray.700'>
                    Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
                    These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracing your interaction with the embedded content if you have an account and are logged in to that website.
                  </Text>
                </Box>
              </Box>

              <Separator />

              {/* Who We Share Data With */}
              <Box>
                <Heading as='h3' fontSize='xl' color='gray.800' mb={3}>Who We Share Your Data With</Heading>
                <Text mb={4}>We use a handful of third party programs that help us provide a comprehensive and helpful experience to our users.</Text>
                <Stack gap={4}>
                  <Box>
                    <Text fontWeight="bold">Google Analytics — Advertising</Text>
                    <Text>Google Analytics uses cookies (read about our Cookie Policy) to help analyze visitor data – how they get to the site, use the site, etc. We use this data to help create a better experience for site users. We encourage you to read Google’s privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">GPT-Trainer & WP Forms — Customer Support</Text>
                    <Text>When you contact us via our contact form or send an email to esther@zippamarketing.com, editor@zippamarketing.com or clientsuccess@zippamarketing.com we use Zoho to manage these as support tickets. We encourage you to read Zoho’s privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">MetForm — Data Collection</Text>
                    <Text>Zippa Marketing uses MetForms to create data collection forms to both share with users and collect data for data analysis. We encourage you to read MetForm’ privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">GSC — Heatmap</Text>
                    <Text>Zippa Marketing uses GSC to collect anonymous data on how users interact with the site. We encourage you to read GSC’s privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Facebook Group — Community</Text>
                    <Text>Zippa Marketing uses a facebook group as a point of convergence for their members. Questions around name and emails are collected before an individual is allowed to join the group.We encourage you to read Facebook’s privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Easy Digital Downloads — Product Sales</Text>
                    <Text>Zippa Marketing uses EDD for their template, Ebooks and checklist (both free and paid versions). EDD collects user information for record keeping and purchase access and tracks activity through the information. We encourage you to read EDD’s privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">YouTube & Streamyard — Video Host</Text>
                    <Text>Zippa Marketing uses YouTube and Streamyard to host videos, stream webinars, podcasts and Host Week. Both platforms anonymously collect data on when someone watches one of our videos. We encourage you to read YouTube's and Streamyard privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Make.com — Automated Workflows</Text>
                    <Text>Zippa Marketing uses make.com to help connect and pass information from one piece of software to the next. We encourage you to read Make’s privacy policy.</Text>
                  </Box>
                  <Box>
                    <Text fontWeight="bold">Sendfox — Email Provider</Text>
                    <Text>Zippa Marketing uses Sendfox for opt-in forms as well as to send emails to those who sign up. This includes but isn’t limited to our weekly email newsletter, TT Transform reminders, travel match reminders, Brand Spotlight reminders, tourism clinic reminders, and occasional emails from the Zippa Marketing team. We encourage you to read.</Text>
                  </Box>
                </Stack>
                <Text mt={4} fontWeight="bold">If you have any questions about our Privacy Policy, please contact us!</Text>
              </Box>

              <Separator />

              {/* Blog Disclaimer */}
              <Box>
                <Heading as='h3' fontSize='xl' color='gray.800' mb={3}>BLOG DISCLAIMER</Heading>
                <Text color='gray.700' lineHeight='tall'>
                  Hey, everyone<br />
                  Welcome to Zippa Marketing, where we share tips, ideas, and advice to help your travel and tour businesses grow. Just so you know, the information on this site is meant to be helpful and fun.<br /><br />
                  We try our best to keep the information on the blog page accurate and up to date, but things can change, and we can’t promise everything here will always be 100% perfect for your situation.<br /><br />
                  If you're making important decisions, it’s always a good idea to talk to us.<br /><br />
                  Also, some links on this site might be to products or services we love—and if you use those links, we might earn a small commission at no extra cost to you.<br /><br />
                  Thanks for visiting Zippa Marketing<br />
                  We hope you find something useful and enjoy your time here. 😊
                </Text>
              </Box>

              <Separator />

              {/* Terms of Service */}
              <Box>
                <Heading as='h3' fontSize='xl' color='gray.800' mb={3}>TERMS OF SERVICE</Heading>
                <Text fontWeight="bold">Definitions for Zippa Marketing</Text>
                <Text mb={2}><Text as="span" fontWeight="bold">Parties:</Text> “You” and “your” refer to you, the person using this site. A “user” is anyone who visits, browses, interacts with, or in any way accesses the Site. “We,” “us,” and “our” refer to Zippa Marketing.</Text>
                <Text mb={4}><Text as="span" fontWeight="bold">Content:</Text> Content: Any text, images, videos, audio, or other types of data shared or used on the Site. Your Content: Anything you share, post, or submit on this Site, like reviews, messages, or information in your account profile. User Content: Content shared by all users of the Site, including you. Zippa Marketing Content: Content we create and share on the Site. Third-Party Content: Content shared by others who are not you, other users, or Zippa Marketing. Site Content: Everything shared on the Site, including Your Content, User Content, Third-Party Content, and Zippa Marketing Content.</Text>
                
                <Text fontWeight="bold">Terms of Use</Text>
                <Text mb={4}>
                  By using Zippa Marketing’s website, you agree to follow these Terms and Conditions of Use and abide by all applicable laws. If you don’t agree with any part of these terms, please don’t use this site.
                  You also agree not to use this site to promote businesses, events, or other ventures for commercial purposes unless done through an approved Business Account and in compliance with our Business Terms.
                  All materials on this site are protected by copyright and trademark laws.
                </Text>

                <Text fontWeight="bold">Trademarks</Text>
                <Text>
                  Zippa Marketing and its logo, along with any related names, slogans, or graphics, are trademarks of Zippa Marketing.
                  If you have any questions about these terms, feel free to reach out! 😊
                </Text>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}