type UserProfile = {
  user?: string;
  image?: string;
  images: Images[];
  itsMyProfile?: boolean;
  description?: string;
  subscriber?: number;
  subscribes?: number;
  isSubscribe?: boolean;
}

export type { UserProfile }

type Comments = {
  username: string;
  value: string;
  date: string;
}

export type { Comments }

type Images = {
  id?: number;
  username?: string;
  image?: string;
  description?: string;
  isLike?: boolean;
  date?: string;
}

export type { Images }

type NotFoundProps = {
  username: string
}

export type { NotFoundProps }

type AddLikeProps = {
  imageId: Number;
  isLike: boolean;
  setLikesCount: (n: number) => void;
}
export type { AddLikeProps }

type ImageProps = {
  itsMyProfile: boolean;
  setShowDeletePhoto: (v: boolean) => void;
  id: Number;
  username: string;
  description: string;
  image: string;
  likesCount: Number;
  commentsCount: Number;
  comments: {
    user: string;
    date: string;
    value: string
  }
  isLike: boolean;
  date: string;
  closeModal?: any;
}
export type { ImageProps }
