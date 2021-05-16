export interface BlogPostDto {
  imgPostBase64: string;
  nombre: string;
  desc: string;
  htmlContent: string;
  draft: boolean;
  userId: string;
  slug: string;
  created?: Date;
  visible?: boolean;
  likes?: number;
  id?: string;
}
