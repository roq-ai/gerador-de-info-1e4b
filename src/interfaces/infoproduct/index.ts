import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface InfoproductInterface {
  id?: string;
  name: string;
  content: string;
  description: string;
  status: string;
  business_id?: string;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface InfoproductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  content?: string;
  description?: string;
  status?: string;
  business_id?: string;
}
