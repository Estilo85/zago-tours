import { Avatar } from '@chakra-ui/react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface AvatarImageProps {
  src: string;
  name: string;
  size?: AvatarSize;
}

export const AvatarImage = ({ src, name, size = 'md' }: AvatarImageProps) => {
  return (
    <Avatar.Root size={size}>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={src} />
    </Avatar.Root>
  );
};
