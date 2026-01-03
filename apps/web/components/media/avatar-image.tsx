import { Avatar } from '@chakra-ui/react';

export const AvatarImage = ({ src, name }: { src: string; name: string }) => {
  return (
    <Avatar.Root>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={src} />
    </Avatar.Root>
  );
};
