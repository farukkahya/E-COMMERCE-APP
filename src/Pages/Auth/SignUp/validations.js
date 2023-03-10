import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Zorunlu alan."),
  email: yup.string().email('Geçerli bir email adresi giriniz.').required("Zorunlu alan."),
  password: yup.string().min(5,"Parolanız en az 5 karakter olmalıdır.").required("Zorunlu alan."),
  passwordConfirm: yup.string().oneOf([yup.ref("password")], "Parolalar eşleşmiyor.").required("Zorunlu alan.")
});

export default schema;