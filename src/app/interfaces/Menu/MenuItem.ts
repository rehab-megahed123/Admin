export interface MenuItem {
  id: number;
  nameAr: string;
  nameEn: string;
  iconUrl?: string | null;
  parentMenuId?: number | null;
  pageId?: number;
  isActive: boolean;
  children?: MenuItem[];
   route?: string;
}