import * as yup from 'yup';

export const infoproductValidationSchema = yup.object().shape({
  name: yup.string().required(),
  content: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().required(),
  business_id: yup.string().nullable(),
});
