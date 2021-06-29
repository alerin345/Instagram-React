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



type Comments = {
  username: string;
  value: string;
  date: string;
}


type Images = {
  id?: number;
  username?: string;
  image?: string;
  description?: string;
  isLike?: boolean;
  date?: string;
}


type NotFoundProps = {
  username: string
}


type AddLikeProps = {
  imageId: Number;
  isLike: boolean;
  setLikesCount: (n: number) => void;
}

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
export type { ImageProps, UserProfile, Comments, Images, NotFoundProps, AddLikeProps }
