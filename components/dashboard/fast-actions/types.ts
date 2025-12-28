import { CategoryStatsPropsReturn } from "@/types/category/type";
import { ChildrenType } from "@/types/type";

export interface FastActionButtonProps {
  Icon: ChildrenType;
  bgColor: string;
  text: string;
  handleClick: Function;
  handleCreateCategory?: ({ name }: { name: string }) => Promise<void>;
  type: string;
  categories?: CategoryStatsPropsReturn;
}

export interface TransactionFormData {
  name: string;
  value: number;
  brand?: string;
  type: "Fixed" | "Variable";
  category: string;
  categoryId?: string;
}

export interface TransactionFormProps {
  type: string;
  formData: TransactionFormData;
  isLoading: boolean;
  categories?: CategoryStatsPropsReturn;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onFormDataChange: (data: Partial<TransactionFormData>) => void;
  onCreateCategory?: ({ name }: { name: string }) => Promise<void>;
}