import {
  AgreeWithSignUp,
  AlreadyHaveAnAccount,
  AuthSignIn,
  CreateAccount,
  CreateYourAccount,
  EmailAddressSignUp,
  EnterYourPersonalDetailsToCreateAccount,
  Href,
  ImagePath,
  OrSignUpWith,
  PasswordSignUp,
  PrivacyPolicy,
  YourNameSignUp,
} from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import { SignupProp, SignupSubmitProp } from "@/Types/AuthType";
import {
  Field,
  Formik,
  FormikHelpers,
  FormikProvider,
  useFormik,
} from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { OtherWay } from "./OtherWay";
import axios from "axios";
import { toast } from "react-toastify";
import generator from "generate-password";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const EdgeDataList = ["Marié", "Célibataire", "En Concubinage"];
export const GenreDataList = ["Femme", "Homme"];

export interface ClientSubmitProp {
  Nom: string;
  DateNaissance: Date;
  email: string;
  password: string;
  Genre: string;
  Situationmatrimoniale: string;
  IsEmail: false;
  Tel: string;
  Tel2: string;
  Profession: string;
  Pays: string;
  Ville: string;
  CommentFIV: string;
  tentativeFIV: boolean;
  consultationVIP: boolean;
}

export const RegisterForm: React.FC<SignupProp> = ({ logoClass }) => {
  const [show, setShow] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      Nom: "",
      DateNaissance: new Date(),
      email: "",
      Genre: "Femme",
      Situationmatrimoniale: "Marié",
      IsEmail: false,
      Tel: "",
      Tel2: "",
      Profession: "",
      Pays: "",
      Ville: "",
      CommentFIV: "",
      tentativeFIV: "",
      consultationVIP: "",
      username: "",
      password: "",
      jour: "",
      hour: "",
    },
    onSubmit: async (values) => {
      generateCredentials();
      console.log(JSON.stringify(formik.values, null, 2));
      await login(JSON.stringify(formik.values, null, 2));
    },
    onReset(values, formikHelpers) {
      formik.values = {
        Nom: "",
        DateNaissance: new Date(),
        email: "",
        Genre: "Femme",
        Situationmatrimoniale: "Marié",
        IsEmail: false,
        Tel: "",
        Tel2: "",
        Profession: "",
        Pays: "",
        Ville: "",
        CommentFIV: "",
        tentativeFIV: "",
        consultationVIP: "",
        username: "",
        password: "",
        jour: "",
        hour: "",
      };
    },
  });

  useEffect(() => {
    generateCredentials();
  }, []);

  const generateCredentials = () => {
    const username = generator.generate({
      length: 12,
      numbers: true,
      symbols: false,
      uppercase: true,
      lowercase: true,
    });

    const password = generator.generate({
      length: 12,
      numbers: true,
      symbols: false,
      uppercase: true,
      lowercase: true,
    });

    formik.setFieldValue("username", username);
    formik.setFieldValue("password", password);
  };

  const login = async (data: any): Promise<any> => {
    try {
      const response = await axios.post(
        `https://narcisseapi.covenantcloud.online/api/auth/local/register`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const { jwt, user } = response.data;

      await sendmail(user);
      router.push(
        "/fr/others/authentication/registerwizard?id=" + user.id.toString()
      );
      formik.resetForm();
      generateCredentials();
      setShow(false);

      return { isSuccessed: true, user, token: jwt };
    } catch (error) {
      alert("Please Enter Valid Email Or Password");
      return {
        isSuccessed: false,
        error: "Please Enter Valid Email Or Password.",
      };
    }
  };

  const sendmail = async (data: any): Promise<any> => {
    try {
      const response = await axios.get(
        `https://transitreport.covenantcloud.online/api/SendMail?id=${data.id}&email=${data.email}`
      );

      console.log(response.data);

      return {};
    } catch (error) {
      return {
        isSuccessed: false,
        error: "Please Enter Valid Email Or Password.",
      };
    }
  };

  const { i18LangStatus } = useAppSelector((state) => state.langSlice);

  const handleCheckboxChange = (event: any) => {
    // Mise à jour de l'état avec la nouvelle sélection
    const { name, checked } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: checked,
    }));
    formik.values.CommentFIV = name;
    console.log(selectedOptions);
  };

  const handleRadioChange = (event: any) => {
    // Mise à jour de l'état avec la nouvelle sélection
    const { name, checked } = event.target;

    formik.values.jour = name;
  };

  const handleRadioHourChange = (event: any) => {
    // Mise à jour de l'état avec la nouvelle sélection
    const { name, checked } = event.target;

    formik.values.hour = name;
  };

  // Pour gérer la saisie de texte dans "Autres"
  const handleOtherInputChange = (event: any) => {
    const { name, value } = event.target;
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    formik.values.CommentFIV = value;
  };

  return (
    <FormikProvider value={formik}>
      {show === true ? (
        <>
          <div>
            <div className="login-main">
              <form className="custom-input" onSubmit={formik.handleSubmit}>
                <h4>Formulaire d'inscription</h4>
                <p>FIV POUR TOUS 2024</p>

                <FormGroup>
                  <Label className="col-form-label">1.Nom & Prénom(s) *</Label>
                  <Field
                    name="Nom"
                    type="text"
                    className="form-control"
                    required
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    2.Date de naissance *
                  </Label>
                  <Input
                    type="date"
                    name="DateNaissance"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>

                <FormGroup>
                  <Label check>3.Genre *</Label>
                  <Input
                    name="Genre"
                    type="select"
                    className={`digits`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {GenreDataList.map((item, index) => (
                      <option key={index}>{item}</option>
                    ))}
                  </Input>
                </FormGroup>

                <FormGroup>
                  <FormGroup>
                    <Label check>4.Situation matrimoniale *</Label>
                    <Input
                      name="Situationmatrimoniale"
                      type="select"
                      className={`digits`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {EdgeDataList.map((item, index) => (
                        <option key={index}>{item}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">5.Adresse mail</Label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    7.Téléphone 1 (Le numéro WhatsApp) *
                  </Label>
                  <Field
                    name="Tel"
                    type="text"
                    className="form-control"
                    required
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    8.Téléphone 2 (WhatsApp éventuellement)
                  </Label>
                  <Field
                    name="Tel2"
                    type="text"
                    className="form-control"
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">9.Profession *</Label>
                  <Field
                    name="Profession"
                    type="text"
                    className="form-control"
                    required
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    10.Pays de résidence *
                  </Label>
                  <Field
                    name="Pays"
                    type="text"
                    className="form-control"
                    required
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    11.Ville de résidence *
                  </Label>
                  <Field
                    name="Ville"
                    type="text"
                    className="form-control"
                    required
                    placeholder=""
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    12.Comment avez-vous entendu parler de la FIV pour tous 2024
                    ? *
                  </Label>

                  {[
                    { id: "option1", label: "Site internet" },
                    {
                      id: "option2",
                      label: "Dans les locaux de la clinique PROCREA",
                    },
                    { id: "option3", label: "SMS" },
                    { id: "option4", label: "Réseaux sociaux" },
                    { id: "option5", label: "E-mail" },
                    { id: "option6", label: "Bouche-à-oreille" },
                    { id: "option7", label: "Autres" },
                  ].map((option) => (
                    <Row key={option.id} className="form-check">
                      <Input
                          className="form-check-input"
                        id={option.id}
                        type="checkbox"
                        name={option.label}
                        onChange={handleCheckboxChange}
                      />
                      <Label className="mb-0" htmlFor={option.id} check>
                        {option.label}
                      </Label>
                    </Row>
                  ))}

                  {/* Option "Autres" avec input texte */}
                  {/* <Row className="form-check">
                    <Input
                      id="optionOther"
                      type="checkbox"
                      name="Autres"
                      onChange={handleCheckboxChange}
                    />
                    <Input
                      id="optionOtherText"
                      type="text"
                      name="Autres"
                      placeholder="Autres"
                      onChange={handleOtherInputChange}
                      onBlur={handleOtherInputChange}
                    />
                  </Row> */}
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    13.Est-ce votre première tentative FIV ? *
                  </Label>

                  <div className="mb-3 d-flex gap-3 checkbox-checked">
                    <div className="form-check">
                      <Input
                        id="flexRadioDefault1"
                        type="radio"
                        name="tentativeFIV"
                        value="Oui"
                        required
                        checked={formik.values.tentativeFIV === "Oui"}
                        onChange={formik.handleChange}
                      />
                      <Label
                        className=" mb-0"
                        htmlFor="flexRadioDefault1"
                        check
                      >
                        Oui
                      </Label>
                    </div>
                    <div className="form-check">
                      <Input
                        id="flexRadioDefault2"
                        type="radio"
                        name="tentativeFIV"
                        value="Non"
                        required
                        checked={formik.values.tentativeFIV === "Non"}
                        onChange={formik.handleChange}
                      />
                      <Label className="mb-0" htmlFor="flexRadioDefault2" check>
                        Non
                      </Label>
                    </div>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label className="col-form-label">
                    14.Souhaitez-vous une consultation VIP (30.000 FCFA) ? *
                  </Label>
                  <div className="mb-3 d-flex gap-3 checkbox-checked">
                    <div className="form-check">
                      <Input
                        id="flexRadioDefault1"
                        type="radio"
                        name="consultationVIP"
                        value="Oui"
                        checked={formik.values.consultationVIP === "Oui"}
                        onChange={formik.handleChange}
                      />
                      <Label
                        className=" mb-0"
                        htmlFor="flexRadioDefault1"
                        check
                      >
                        Oui
                      </Label>
                    </div>
                    <div className="form-check">
                      <Input
                        id="flexRadioDefault2"
                        type="radio"
                        name="consultationVIP"
                        value="Non"
                        checked={formik.values.consultationVIP === "Non"}
                        onChange={formik.handleChange}
                      />
                      <Label className="mb-0" htmlFor="flexRadioDefault2" check>
                        Non
                      </Label>
                    </div>
                  </div>
                </FormGroup>

                {formik.values.consultationVIP === "Non" && (
                  <>
                    <FormGroup>
                      <Label className="col-form-label">
                        15.Quel jour souhaiteriez-vous être reçu(e) ?*
                      </Label>

                      {[
                        { id: "option1", label: "Lundi" },
                        {
                          id: "option2",
                          label: "Mardi",
                        },
                        { id: "option3", label: "Mercredi" },
                        { id: "option4", label: "Jeudi" },
                        { id: "option5", label: "Vendredi" },
                        { id: "option6", label: "Samedi (08H00 - 12H00)" },
                      ].map((option) => (
                        <Row key={option.id} className="form-check">
                          <Input
                          className="form-check-input"
                            id={option.id}
                            type="radio"
                            name={option.label}
                            onChange={handleRadioChange}
                          />
                          <Label className="mb-0" htmlFor={option.id} check>
                            {option.label}
                          </Label>
                        </Row>
                      ))}
                    </FormGroup>

                    <FormGroup>
                      <Label className="col-form-label">
                        16.Quelle plage horaire vous convient ? *
                      </Label>

                      {[
                        { id: "option1", label: "08H00 - 12H00" },
                        {
                          id: "option2",
                          label: "14H00 - 17H00",
                        },
                      ].map((option) => (
                        <Row key={option.id} className="form-check">
                          <Input
                            id={option.id}
                            type="radio"
                            name={option.label}
                            onChange={handleRadioHourChange}
                          />
                          <Label className="mb-0" htmlFor={option.id} check>
                            {option.label}
                          </Label>
                        </Row>
                      ))}
                    </FormGroup>
                  </>
                )}

                {formik.values.consultationVIP === "Oui" && (
                  <>
                    <FormGroup>
                      <Label className="col-form-label">
                        15.Quel jour souhaiteriez-vous être reçu(e) ? *
                      </Label>

                      {[
                        {
                          id: "option1",
                          label:
                            "Dr LADIPKO Titilola (Mercredi / 15H30 - 17H30)",
                        },
                        {
                          id: "option2",
                          label: "Dr N'GALULA Dorcas (Mardi / 09H00 - 12H00)",
                        },
                        {
                          id: "option3",
                          label: "Dr KOUASSI Chantal (Jeudi / 14H30 - 17H30)",
                        },
                        {
                          id: "option4",
                          label: "Dr OUSSOU Clément (Vendredi / 08H00 - 12H00)",
                        },
                        {
                          id: "option5",
                          label: "Dr WOROU Ambroise (Vendredi / 15H30 - 17H30)",
                        },
                      ].map((option) => (
                        <Row key={option.id} className="form-check">
                          <Input
                            id={option.id}
                            type="radio"
                            name={option.label}
                            onChange={handleRadioChange}
                          />
                          <Label className="mb-0" htmlFor={option.id} check>
                            {option.label}
                          </Label>
                        </Row>
                      ))}
                    </FormGroup>
                  </>
                )}

                <FormGroup className="mb-0">
                  <Button type="submit" block color="primary" className="w-100">
                    Envoyer
                  </Button>
                </FormGroup>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="login-main">
              <h4>Formulaire d'inscription</h4>
              <p>FIV POUR TOUS 2024</p>

              <Button
                type="submit"
                block
                color="primary"
                className="w-100"
                onClick={() => setShow(true)}
              >
                Demarer
              </Button>
              <Image
                src={`${ImagePath}/login/3.jpg`}
                alt="Example Image"
                width={600}
                height={700}
              />

            </div>
          </div>
        </>
      )}
    </FormikProvider>
  );
};
