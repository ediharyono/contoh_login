import useStyles from "./styles";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Grow
} from "@material-ui/core";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/post";
import { useHistory } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const Claim = ["Note", "Registration", "Orientation"];

const Semester = ["S1", "S2", "S3", "S4", "S5", "S6"];

const Faculty = ["SMI", "SMA", "SMP", "SMC", "STU"];

const Request = [
  "Transcript",
  "Derogation",
  "Registration Certificate",
  "Certificate of Achievement",
  "Diploma",
  "Student Card"
];

const All = {
  SMI: {
    S1: [
      "Analyse 1 ",
      "Algèbre 1",
      "Algèbre 2",
      "Reseau",
      "Physique 2",
      "Informatique 1",
      "Langue et terminologie 1"
    ],
    S2: [
      "Analyse 2",
      "Analyse 3",
      "Algèbre 3",
      "Eléctrostatique et Eléctrocinétique",
      "Optique",
      "Algorithmique 1",
      "Langue et terminologie 2"
    ],
    S3: [
      "Programmation 1",
      "Technologie du web",
      "Électronique",
      "Algorithmique 2",
      "système d'exploitation 1",
      "Probabilité et statistique"
    ],
    S4: [
      "Structure de donnée",
      "Systèm d'exploitation 2",
      "Analyse Numérique",
      "Electromagnétisme",
      "Programmation 2",
      "Architecture d'ordinateur"
    ],
    S5: [
      "Bases de données",
      "Compilation",
      "Réseau",
      "Recherche opérationnelle",
      "Conception Orientée Objet (UML) ",
      "Programmation Orientée Objet (c++)"
    ],
    S6: [
      "Java",
      "Programmation de BD",
      "Devleppment web",
      "Administration de BD",
      "PFE"
    ]
  },
  SMP: {
    S1: [
      "Mécanique du point",
      "Thermodynamique 1",
      "Atomistique",
      "Thermochimie",
      "Analyse 1",
      "Algèbre 1",
      "Langue et Terminologie 1"
    ],
    S2: [
      "Electrostatique et Electrocinétique",
      "Optique géométrique",
      "Liaisons chimiques",
      "Chimie des solutions",
      "Analyse 2",
      "Algèbre 2",
      "Langue et Terminologie 2"
    ],
    S3: [
      "Mécanique du solide",
      "Thermodynamique 2",
      "Electromagnétisme dans le vide",
      "Chimie organique générale",
      "Analyse 3",
      "Analyse Numérique & Algorithmique"
    ],
    S4: [
      "Electronique de base",
      "Optique physique",
      "Electricité 3",
      "Mécanique quantique",
      "Cristallographie géométrique et cristallochimie",
      "Informatique"
    ],
    S5: [
      "Electronique Analogique",
      "Mécanique Analytique et Vibrations",
      "Physique Nucléaire",
      "Physique des Matériaux",
      "Physique Quantique",
      "Physique Statistique"
    ],
    S6: [
      "Physique numérique",
      "Instrumentation et Mesures Physiques",
      "Physique de la Matière Condensée",
      "Matière Molle",
      "Module d'ouverture Fondamentale",
      "PFE Fondamentale",
      "Fonctions électroniques",
      "Eléctronique numérique",
      "Electrotechnique",
      "Réseaux / Télécoms",
      "Module d'ouverture Eléctronique",
      "PFE Eléct",
      "Mécanique des fluides",
      "Elasticité et Résistance des Matériaux",
      "Transferts Thermiques",
      "Méthodes Numériques",
      "Module d'ouverture Mécanique",
      "PFE Mécanique Enérgetique"
    ]
  },
  SMC: {
    S1: [
      "Mécanique du Point",
      "Thermodynamique 1",
      "Thermochimie",
      "Atomistique",
      "Algèbre 1",
      "Analyse 1",
      "Langue et Terminologie 1"
    ],
    S2: [
      "Électrostatique et Électrocinétique",
      "Optique Géométrique",
      "Liaisons Chimiques",
      "Chimie des Solutions",
      "Algèbre 2",
      "Analyse 2",
      "Langue et Terminologie 2"
    ],
    S3: [
      "Chimie Organique Générale",
      "Chimie Descriptive I et Diagrammes de Phases",
      "Électromagnétisme dans le Vide",
      "Chimie Expérimentale : Travaux Pratiques",
      "Chimie des Électrolytes",
      "Mathématiques pour la Chimie"
    ],
    S4: [
      "Hydrocarbures et Fonctions Monovalentes",
      "Cristallographie Géométrique et Cristallochimie 1",
      "Thermodynamique Chimique",
      "Mécanique Quantique",
      "Informatique",
      "Probabilités Statistique"
    ],
    S5: [
      "Chimie Organique Fonctionnelle",
      "Radiocristallographie et Cristallochimie 2",
      "Cinétique et Catalyse",
      "Chimie Théorique",
      "Electrochimie",
      "Techniques Spectroscopiques d’Analyse (UV-IR, RMN 1H, Masse)"
    ],
    S6: [
      "Les Grandes Classes des Réactions Organiques",
      "Chimie Descriptive II et Chimie de Coordination",
      "Chimie Organique Industrielle",
      "Chimie Analytique",
      "Grandes Classes des Matériaux",
      "Chimie Verte et Procédés Propres",
      "Projet Tutoré",
      "PFE"
    ]
  },
  SMA: {
    S1: [
      "ANALYSE 1",
      "ALGEBRE 1",
      "ALGEBRE 2",
      "PHYSIQUE 1",
      "PHYSIQUE 2",
      "INFORMATIQUE 1",
      "LANGUES ET TERMINOLOGIE 1"
    ],
    S2: [
      "ANALYSE 2",
      "ANALYSE 3",
      "ALGEBRE 3",
      "PHYSIQUE 3",
      "PHYSIQUE 4",
      "INFORMATIQUE 2",
      "LANGUES ET TERMINOLOGIE 2"
    ],
    S3: [
      "ANALYSE 4",
      "ANALYSE 5",
      "ALGEBRE 4",
      "PROBABILITES ET STATISTIQUE",
      "PHYSIQUE 5",
      "INFORMATIQUE 3"
    ],
    S4: [
      "ANALYSE 6",
      "ALGEBRE 5",
      "ALGEBRE 6",
      "ANALYSE NUMERIQUE 1",
      "PHYSIQUE 6",
      "INFORMATIQUE 4"
    ],
    S5: [
      "TOPOLOGIE",
      "INTEGRATION",
      "CALCUL DIFFERENTIEL",
      "PROGRAMMATION MATHEMATIQUE",
      "ANALYSE NUMERIQUE",
      "INFORMATIQUE 5"
    ],
    S6: [
      "TOPOLOGIE 2 (ANALYSE FONCTIONNELLE)",
      "GEOMETRIE",
      "STATISTIQUE MATHEMATIQUE",
      "DISTRIBUTION ET TRANSFORMEES",
      "PFE",
      "PROJET TUTOR"
    ]
  },
  STU: {
    S1: [
      "Biologie cellulaire",
      "Embryologie-Histologie",
      "Géologie générale",
      "Mathématiques",
      "Physique 1",
      "Chimie générale",
      "Langues et Terminologie 1"
    ],
    S2: [
      "Biologie des organismes animaux",
      "Biologie des organismes végétaux",
      "Géodynamique externe",
      "Géodynamique interne",
      "Physique 2",
      "Chimie 2",
      "Langues et Terminologie 2"
    ],
    S3: [
      "Tectonique analytique",
      "Tectonique globale",
      "Pétrologie magmatique",
      "Pétrologie métamorphique",
      "Physique appliquée aux sciences de la terre",
      "Statistiques"
    ],
    S4: [
      "Pétrographie sédimentaire",
      "Sédimentologie",
      "Paléontologie",
      "Stratigraphie",
      "Géo-informatique",
      "Chimie appliquée aux sciences de la Terre"
    ],
    S5: [
      "Géologie du Maroc 1",
      "Géologie du Maroc 2",
      "Métallogénie",
      "Hydrogéologie",
      "Géophysque",
      "Géochimie"
    ],
    S6: [
      "Mécanique des sols",
      "Patrimoine géologique",
      "Mines, carrières et environnement",
      "Phosphates et gîtes  sédimentaires",
      "Energies fossiles et renouvelables",
      "Micropaléontologie et paléoenvironnement"
    ]
  }
};

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(1)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 20,
    padding: "10px 26px 10px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const Form = ({ setCurrentId }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: user?.result.name,
    email: user?.result.email,
    CIN: user?.result.CIN,
    CNE: user?.result.CNE,
    Apo: user?.result.Apo,
    forAdmin: true,
    forProf: true,
    DR: "",
    TDR: "",
    Faculty: "",
    title: "",
    content: "",
    tags: "",
    selectedFile: "",
    createAt: new Date(),
    module: ""
  });
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();
  const [Module, setModule] = useState([]);
  const [FS, setFS] = useState({});
  const [TypeR, setTypeR] = useState("Type");
  const [TypeD, setTypeD] = useState("Type");
  const [TypeF, setTypeF] = useState("Faculty");
  const [TypeM, setTypeM] = useState("Module");
  const [TypeS, setTypeS] = useState("Semester");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    dispatch(createPost(postData));
    clear();
    history.push("/dashboard");
  };

  const handleChangeR = (e) => {
    setPostData({ ...postData, DR: e.target.value });
    setTypeR(e.target.value);
    e.preventDefault();
  };

  const handleChangeD = (e) => {
    e.target.value === "Note"
      ? setPostData({
          ...postData,
          TDR: e.target.value,
          forProf: true,
          forAdmin: false
        })
      : setPostData({
          ...postData,
          TDR: e.target.value,
          forProf: false,
          forAdmin: true
        });
    setTypeD(e.target.value);
    e.preventDefault();
  };

  const handleChangeF = (e) => {
    setPostData({ ...postData, Faculty: e.target.value });
    setTypeF(e.target.value);
    if (TypeD === "Note" || TypeD === "Derogation") {
      e.target.value === "SMI"
        ? setFS(All.SMI)
        : e.target.value === "SMA"
        ? setFS(All.SMA)
        : e.target.value === "SMP"
        ? setFS(All.SMP)
        : e.target.value === "SMC"
        ? setFS(All.SMC)
        : e.target.value === "STU"
        ? setFS(All.STU)
        : setFS({});
    } else {
      setModule([]);
      e.target.value === "SMI"
        ? setModule(
            Module.concat(
              All.SMI.S1,
              All.SMI.S2,
              All.SMI.S3,
              All.SMI.S4,
              All.SMI.S5,
              All.SMI.S6
            )
          )
        : e.target.value === "SMA"
        ? setModule(
            Module.concat(
              All.SMA.S1,
              All.SMA.S2,
              All.SMA.S3,
              All.SMA.S4,
              All.SMA.S5,
              All.SMA.S6
            )
          )
        : e.target.value === "SMP"
        ? setModule(
            Module.concat(
              All.SMP.S1,
              All.SMP.S2,
              All.SMP.S3,
              All.SMP.S4,
              All.SMP.S5,
              All.SMP.S6
            )
          )
        : e.target.value === "SMC"
        ? setModule(
            Module.concat(
              All.SMC.S1,
              All.SMC.S2,
              All.SMC.S3,
              All.SMC.S4,
              All.SMC.S5,
              All.SMC.S6
            )
          )
        : e.target.value === "STU"
        ? setModule(
            Module.concat(
              All.STU.S1,
              All.STU.S2,
              All.STU.S3,
              All.STU.S4,
              All.STU.S5,
              All.STU.S6
            )
          )
        : setModule([]);
    }
    e.preventDefault();
  };

  const handleChangeS = (e) => {
    setPostData({ ...postData, tags: e.target.value });
    setTypeS(e.target.value);
    e.target.value === "S1"
      ? setModule(FS.S1)
      : e.target.value === "S2"
      ? setModule(FS.S2)
      : e.target.value === "S3"
      ? setModule(FS.S3)
      : e.target.value === "S4"
      ? setModule(FS.S4)
      : e.target.value === "S5"
      ? setModule(FS.S5)
      : e.target.value === "S6"
      ? setModule(FS.S6)
      : setModule([]);
    e.preventDefault();
  };

  const handleChangeM = (e) => {
    setPostData({ ...postData, module: e.target.value });
    setTypeM(e.target.value);
    e.preventDefault();
  };

  const clear = () => {
    setTypeR("Type");
    setTypeD("Type");
    setTypeF("Faculty");
    setCurrentId(0);
    setPostData({
      creator: user?.result.name,
      email: user?.result.email,
      CIN: user?.result.CIN,
      CNE: user?.result.CNE,
      Apo: user?.result.Apo,
      forAdmin: true,
      forProf: true,
      DR: "",
      TDR: "",
      Faculty: "",
      title: "",
      content: "",
      tags: "",
      selectedFile: "",
      createAt: new Date(),
      module: ""
    });
    setIsPending(false);
  };

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <form
                autoComplete="off"
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
              >
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.header}
                >
                  Create a Compliant Report
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      color="secondary"
                      className={classes.form}
                    >
                      <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label"></InputLabel>
                        <Select
                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          value={TypeR}
                          onChange={handleChangeR}
                          input={<BootstrapInput />}
                        >
                          <MenuItem value="Type">
                            <em>Type</em>
                          </MenuItem>
                          <MenuItem value="Claim">Claim</MenuItem>
                          <MenuItem value="Request">Request</MenuItem>
                        </Select>
                      </FormControl>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      color="secondary"
                      className={classes.form}
                    >
                      <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label"></InputLabel>
                        <Select
                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          value={TypeD}
                          onChange={handleChangeD}
                          input={<BootstrapInput />}
                        >
                          <MenuItem value="Type">
                            <em>Type</em>
                          </MenuItem>
                          {TypeR === "Claim" ? (
                            Claim.map((type, i) => (
                              <MenuItem key={"type" + i} value={type}>
                                {type}
                              </MenuItem>
                            ))
                          ) : TypeR === "Request" ? (
                            Request.map((type, i) => (
                              <MenuItem key={"type" + i} value={type}>
                                {type}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value="Other">Other</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="filled"
                      disabled
                      fullWidth
                      id="firstName"
                      label="Full Name"
                      value={postData.creator}
                      onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="filled"
                      disabled
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      value={postData.email}
                      onChange={(e) =>
                        setPostData({ ...postData, email: e.target.value })
                      }
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="filled"
                      disabled
                      fullWidth
                      id="CIN"
                      label="CIN"
                      name="CIN"
                      value={postData.CIN}
                      onChange={(e) =>
                        setPostData({ ...postData, CIN: e.target.value })
                      }
                      autoComplete="CIN"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="filled"
                      disabled
                      fullWidth
                      id="CNE"
                      label="CNE"
                      name="CNE"
                      value={postData.CNE}
                      onChange={(e) =>
                        setPostData({ ...postData, CNE: e.target.value })
                      }
                      autoComplete="CNE"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant="filled"
                      disabled
                      fullWidth
                      id="Apo"
                      label="Apo"
                      name="Apo"
                      value={postData.Apo}
                      onChange={(e) =>
                        setPostData({ ...postData, Apo: e.target.value })
                      }
                      autoComplete="Apo"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography
                      variant="h6"
                      color="secondary"
                      className={classes.form}
                    >
                      <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label"></InputLabel>
                        <Select
                          labelId="demo-customized-select-label"
                          id="demo-customized-select"
                          value={TypeF}
                          onChange={handleChangeF}
                          input={<BootstrapInput />}
                        >
                          <MenuItem value="Faculty">
                            <em>Faculty</em>
                          </MenuItem>
                          {Faculty.map((type, i) => (
                            <MenuItem key={"type" + i} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Typography>
                  </Grid>

                  {(postData.TDR === "Note" ||
                    postData.TDR === "Transcript" ||
                    postData.TDR === "Derogation" ||
                    postData.TDR === "Orientation" ||
                    postData.TDR === "Certificate of Achievement") && (
                    <Grid item xs={12} sm={4}>
                      <Typography
                        variant="h6"
                        color="secondary"
                        className={classes.form}
                      >
                        <FormControl className={classes.margin}>
                          <InputLabel id="demo-customized-select-label"></InputLabel>
                          <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={TypeS}
                            onChange={handleChangeS}
                            input={<BootstrapInput />}
                          >
                            <MenuItem value="Semester">
                              <em>Semester</em>
                            </MenuItem>
                            {Semester.map((type, i) => (
                              <MenuItem key={"type" + i} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Typography>
                    </Grid>
                  )}
                  {(postData.TDR === "Note" ||
                    postData.TDR === "Registration" ||
                    postData.TDR === "Derogation") && (
                    <Grid item xs={12} sm={4}>
                      <Typography
                        variant="h6"
                        color="secondary"
                        className={classes.form}
                      >
                        <FormControl className={classes.margin}>
                          <InputLabel id="demo-customized-select-label"></InputLabel>
                          <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={TypeM}
                            onChange={handleChangeM}
                            input={<BootstrapInput />}
                          >
                            <MenuItem value="Module">
                              <em>Module</em>
                            </MenuItem>
                            {Module.map((type, i) => (
                              <MenuItem key={"type" + i} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Typography>
                    </Grid>
                  )}
                  <TextField
                    name="message"
                    required
                    variant="filled"
                    label="Describe problem or reason for Complaint"
                    fullWidth
                    multiline
                    rows={6}
                    value={postData.content}
                    onChange={(e) =>
                      setPostData({ ...postData, content: e.target.value })
                    }
                  />
                  <div className={classes.fileInput}>
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setPostData({ ...postData, selectedFile: base64 })
                      }
                    />
                  </div>
                  <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isPending}
                    type="submit"
                    fullWidth
                  >
                    {isPending ? "Submitting.." : "Submit"}
                  </Button>
                  <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                  >
                    Clear
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Form;
