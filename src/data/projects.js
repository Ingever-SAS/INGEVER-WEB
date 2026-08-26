import project1 from "../assets/images/project1.jpg";
import project2 from "../assets/images/project2.jpg";
import project3 from "../assets/images/project3.jpg";
import projecto1 from "../assets/images/imagen1.jpeg";
import projecto1_1 from "../assets/images/imagen2.jpeg";
import projecto1_2 from "../assets/images/imagen3.jpeg";
import projecto1_3 from "../assets/images/imagen4.jpeg";
import projecto1_4 from "../assets/images/imagen5.jpeg";
import projecto1_5 from "../assets/images/imagen6.jpeg";
import projecto1_6 from "../assets/images/imagen7.jpeg";
import projecto1_7 from "../assets/images/imagen8.jpeg";
import projecto1_8 from "../assets/images/imagen9.jpeg";
import project31 from "../assets/images/project31.jpeg";
import project32 from "../assets/images/project32.jpeg";
import project33 from "../assets/images/project33.jpeg";
import cueva1 from "../assets/images/Cueva(9).jpeg";
import cueva2 from "../assets/images/Cueva(10).jpeg";
import cueva3 from "../assets/images/Cueva(11).jpeg";
import cueva4 from "../assets/images/Cueva(12).jpeg";
import cueva5 from "../assets/images/Cueva(13).jpeg";
import cueva6 from "../assets/images/Cueva(14).jpeg";
import cueva7 from "../assets/images/Cueva(15).jpeg";
import cueva8 from "../assets/images/Cueva(16).jpeg";
import cueva9 from "../assets/images/Cueva(17).jpeg";
import cueva10 from "../assets/images/Cueva(18).jpeg";
import cueva11 from "../assets/images/Cueva(19).jpeg";
import cueva12 from "../assets/images/Cueva(20).jpeg";
import cueva13 from "../assets/images/Cueva(21).jpeg";
import cueva14 from "../assets/images/Cueva(22).jpeg";
import cueva15 from "../assets/images/Cueva(23).jpeg";
import Pumarejo1 from "../assets/images/Pumarejo1.jpeg";
import Pumarejo2 from "../assets/images/Pumarejo2.jpeg";
import Pumarejo3 from "../assets/images/Pumarejo3.jpeg";// Sustituye los valores marcados como "Por confirmar" por la información validada
// de cada obra. Las tarjetas, rutas y navegación se actualizan automáticamente.
export const projects = [
  {
    id: "recuperacion-puente-grua-RYM",
    slug: "recuperacion-puente-grua-RYM",
    title: "Recuperación estructural y puesta en servicio de puente grúa RYM",

    shortDescription:
      "Recuperación estructural, mantenimiento integral y puesta en servicio de un puente grúa RYM afectado por el desprendimiento de uno de sus testeros.",

    fullDescription:
      "Proyecto ejecutado para la recuperación de un puente grúa RYM que presentó una falla estructural debido al desprendimiento de uno de sus testeros. La intervención incluyó la recuperación estructural del equipo, el mantenimiento mecánico y eléctrico, el reensamble de los componentes y la puesta en servicio, garantizando nuevamente condiciones seguras, confiables y eficientes de operación para el cliente.",

    heroImage: project1,
    heroImageAlt:
      "Recuperación estructural de puente grúa RYM durante trabajos de mantenimiento",

    gallery: [
      {
        src: projecto1,
        alt: "Puente grúa RYM durante la recuperación estructural",
      },
      {
        src: projecto1_1,
        alt: "Proceso de reparación y reensamble del puente grúa",
      },
      {
        src: projecto1_2,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },
      {
        src: projecto1_3,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },
      {
        src: projecto1_4,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },
      {
        src: projecto1_5,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },
      {
        src: projecto1_6,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },

      {
        src: projecto1_7,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },
      {
        src: projecto1_8,
        alt: "Pruebas funcionales y puesta en servicio del equipo",
      },
    ],

    videos: [{
      type: "mp4",
      src: "/videos/video1.mp4",
      title: "Montaje de puente grúa RYM",
      poster: "",
    },
    {
      type: "mp4",
      src: "/videos/video2.mp4",
      title: "Montaje de puente grúa RYM",
      poster: "",
    },],

    client: "Cyrgo",

    location: "Malambo - Atlántico",

    year: "2025",

    duration: "3 días",

    services: [
      "Recuperación estructural",
      "Soldadura especializada",
      "Mantenimiento mecánico",
      "Mantenimiento eléctrico",
      "Reensamble del equipo",
      "Puesta en servicio",
    ],

    technologies: [
      "Puente grúa RYM",
      "Soldadura estructural",
      "Sistema electromecánico",
      "Pruebas funcionales",
    ],

    challenges:
      "Recuperar la integridad estructural del puente grúa después del desprendimiento de uno de sus testeros, garantizando una intervención segura y minimizando el tiempo de inactividad del equipo.",

    solution:
      "Se realizó el descenso controlado del puente grúa, la recuperación estructural mediante soldadura especializada, el reensamble del conjunto, la reconexión del sistema eléctrico, el mantenimiento preventivo de los componentes y las pruebas funcionales necesarias para validar su correcto funcionamiento.",

    results:
      "El puente grúa fue recuperado exitosamente y puesto nuevamente en operación, restableciendo la seguridad, confiabilidad y continuidad de las actividades productivas del cliente.",

    specifications: [
      {
        label: "Marca",
        value: "RYM",
      },
      {
        label: "Servicio realizado",
        value: "Recuperación estructural y puesta en servicio",
      },
      {
        label: "Cliente",
        value: "Cyrgo",
      },
      {
        label: "Año",
        value: "2025",
      },
      {
        label: "Duración",
        value: "3 días",
      },
      {
        label: "Estado",
        value: "Finalizado",
      },
    ],
  }, {
    id: "mantenimiento-polipasto-kito-3-toneladas",
    slug: "mantenimiento-polipasto-kito-3-toneladas",

    title: "Mantenimiento preventivo de polipasto KITO de 3 toneladas",

    shortDescription:
      "Mantenimiento preventivo realizado a un polipasto KITO de 3 toneladas para garantizar su confiabilidad operativa, prolongar la vida útil de sus componentes y asegurar un funcionamiento seguro durante las maniobras de izaje.",

    fullDescription:
      "Proyecto de mantenimiento preventivo ejecutado sobre un polipasto eléctrico KITO de 3 toneladas, enfocado en conservar su óptimo desempeño operativo mediante la inspección de sus sistemas mecánicos y eléctricos, la limpieza y lubricación de componentes, el ajuste de elementos críticos y la realización de pruebas funcionales que permitieran garantizar un funcionamiento seguro y confiable.",

    heroImage: project31,

    heroImageAlt:
      "Mantenimiento preventivo de polipasto KITO de 3 toneladas",

    gallery: [
      {
        src: project31,
        alt: "Inspección general del polipasto KITO durante el mantenimiento preventivo",
      },
      {
        src: project32,
        alt: "Revisión y ajuste de componentes mecánicos del polipasto",
      },
      {
        src: project33,
        alt: "Pruebas funcionales y verificación de seguridad del equipo",
      },
    ],

    videos: [],

    client: "Molino Santa Marta",

    location: "Santa Marta, Magdalena",

    year: "2020 - 2026",

    duration: "Mantenimiento preventivo anual",

    services: [
      "Mantenimiento preventivo",
      "Inspección mecánica",
      "Inspección eléctrica",
      "Lubricación",
      "Ajuste de componentes",
      "Pruebas funcionales",
    ],

    technologies: [
      "Polipasto eléctrico KITO",
      "Sistema electromecánico",
      "Inspección preventiva",
      "Protocolos de seguridad industrial",
    ],

    challenges:
      "Garantizar el correcto funcionamiento del polipasto mediante la detección oportuna del desgaste de sus componentes, evitando fallas inesperadas que pudieran afectar la continuidad de las operaciones de izaje.",

    solution:
      "Se ejecutó un mantenimiento preventivo integral que incluyó inspección general del equipo, limpieza, lubricación, ajuste de componentes mecánicos y eléctricos, verificación de los dispositivos de seguridad y pruebas funcionales para validar el desempeño del polipasto.",

    results:
      "El polipasto KITO de 3 toneladas quedó en óptimas condiciones de operación, garantizando un funcionamiento seguro, confiable y una mayor disponibilidad para las labores de izaje del cliente.",

    specifications: [
      {
        label: "Marca",
        value: "KITO",
      },
      {
        label: "Capacidad",
        value: "3 toneladas",
      },
      {
        label: "Servicio realizado",
        value: "Mantenimiento preventivo",
      },
      {
        label: "Cliente",
        value: "Molino Santa Marta",
      },
      {
        label: "Ubicación",
        value: "Santa Marta, Magdalena",
      },
      {
        label: "Año",
        value: "2020 - 2026",
      },
      {
        label: "Duración",
        value: "Mantenimiento preventivo anual",
      },
      {
        label: "Estado",
        value: "Proceso anual",
      },
    ],
  }, {
    id: "montaje-puente-grua-represa",
    slug: "montaje-puente-grua-represa",

    title: "Montaje de estructura de carrileras e instalación de puente grúa",

    shortDescription:
      "Montaje de carrileras, armado e instalación completa de un puente grúa para una represa, garantizando una puesta en servicio segura y confiable.",

    fullDescription:
      "Proyecto ejecutado durante el año 2018 para el montaje de la estructura de carrileras y el armado e instalación completa de un puente grúa en una represa. La intervención incluyó el montaje de la estructura, la alineación del sistema, los ajustes finales y las pruebas de funcionamiento para garantizar una operación segura y conforme a las especificaciones del proyecto.",

    heroImage: cueva1,

    heroImageAlt:
      "Montaje de carrileras e instalación de puente grúa en una represa",

    gallery: [
      { src: cueva1, alt: "Inicio del montaje de la estructura de carrileras" },
      { src: cueva4, alt: "Proceso de instalación del puente grúa" },
      { src: cueva5, alt: "Montaje estructural del sistema de izaje" },
      { src: cueva6, alt: "Trabajos de armado del puente grúa" },
      { src: cueva7, alt: "Alineación de la estructura" },
      { src: cueva9, alt: "Proceso de montaje del puente grúa" },
      { src: cueva10, alt: "Instalación de componentes principales" },
      { src: cueva11, alt: "Verificación del montaje" },
      { src: cueva12, alt: "Ajustes finales del puente grúa" },
      { src: cueva13, alt: "Pruebas de funcionamiento" },
      { src: cueva15, alt: "Puente grúa completamente instalado" },
    ],

    videos: [
      {
        type: "mp4",
        src: "/videos/cueva.mp4",
        title: "Montaje de estructura de carrileras",
        poster: "",
      },
      {
        type: "mp4",
        src: "/videos/cueva1.mp4",
        title: "Armado e instalación del puente grúa",
        poster: "",
      },
      {
        type: "mp4",
        src: "/videos/cueva2.mp4",
        title: "Pruebas de funcionamiento y puesta en servicio",
        poster: "",
      },
    ],

    client: "Por confirmar",

    location: "Santa Maria - Boyaca",

    year: "2018",

    duration: "Por confirmar",

    services: [
      "Montaje de carrileras",
      "Armado de puente grúa",
      "Instalación",
      "Alineación",
      "Ajustes",
      "Pruebas de funcionamiento",
      "Puesta en servicio",
    ],

    technologies: [
      "Puente grúa industrial",
      "Equipos de izaje",
      "Carrileras",
      "Instrumentos de alineación",
    ],

    challenges:
      "Ejecutar el montaje completo del puente grúa con altos estándares de precisión y seguridad, cumpliendo los tiempos establecidos para el proyecto.",

    solution:
      "El montaje fue desarrollado por personal especializado utilizando equipos de izaje adecuados y aplicando controles de calidad durante todas las etapas del armado, alineación e instalación.",

    results:
      "El puente grúa fue instalado exitosamente y entregado completamente operativo, garantizando un funcionamiento seguro y conforme a las especificaciones técnicas del cliente.",

    specifications: [
      {
        label: "Servicio realizado",
        value: "Montaje completo de puente grúa",
      },
      {
        label: "Ubicación",
        value: "Represa - Colombia",
      },
      {
        label: "Año",
        value: "2018",
      },
      {
        label: "Actividad",
        value: "Montaje de carrileras e instalación",
      },
      {
        label: "Estado",
        value: "Finalizado",
      },
    ],
  },{
  id: "montaje-puente-grua-puente-pumarejo",
  slug: "montaje-puente-grua-puente-pumarejo",

  title: "Montaje de Puente Grúa – Mantenimiento Preventivo",

  shortDescription:
    "Montaje y mantenimiento preventivo de un puente grúa asociado a las actividades de infraestructura del Puente Pumarejo, garantizando seguridad, confiabilidad y disponibilidad operacional.",

  fullDescription:
    "INGEVER ASOCIADOS S.A.S. realizó el montaje y mantenimiento preventivo de un puente grúa asociado a las actividades de infraestructura del Puente Pumarejo durante el año 2018. El proyecto estuvo orientado a garantizar la correcta instalación, operación y conservación del sistema de izaje, mediante actividades técnicas especializadas de montaje, inspección y mantenimiento preventivo.",

  heroImage: Pumarejo1,

  heroImageAlt:
    "Montaje y mantenimiento preventivo de puente grúa en el Puente Pumarejo",

  gallery: [
    {
      src: Pumarejo1,
      alt: "Montaje e instalación del puente grúa en el Puente Pumarejo",
    },{
      src: Pumarejo2,
      alt: "Montaje e instalación del puente grúa en el Puente Pumarejo",
    },{
      src: Pumarejo3,
      alt: "Montaje e instalación del puente grúa en el Puente Pumarejo",
    },
   
  ],

  client: "Por confirmar",

  location: "Puente Pumarejo - Colombia",

  year: "2018",

  duration: "Por confirmar",

  services: [
    "Montaje e instalación del puente grúa",
    "Verificación de componentes mecánicos y eléctricos",
    "Inspección del sistema de izaje",
    "Mantenimiento preventivo",
    "Revisión de sistemas de desplazamiento",
    "Revisión de mecanismos de elevación",
    "Lubricación y ajustes",
    "Pruebas de operación",
    "Inspección de condiciones de seguridad",
    "Entrega del sistema para su operación",
  ],

  technologies: [
    "Puente grúa industrial",
    "Sistema de izaje",
    "Componentes mecánicos y eléctricos",
    "Sistemas de desplazamiento",
    "Mecanismos de elevación",
  ],

  challenges:
    "El principal reto del proyecto fue ejecutar las actividades de montaje y mantenimiento en una infraestructura de alta importancia, garantizando la seguridad del personal, la correcta instalación de los componentes y la confiabilidad del sistema de izaje. Adicionalmente, las actividades debieron realizarse bajo condiciones operativas exigentes, minimizando posibles interrupciones y cumpliendo los requerimientos técnicos y de seguridad establecidos para el proyecto.",

  solution:
    "INGEVER implementó una metodología de trabajo basada en planeación técnica, inspección de componentes, montaje especializado y mantenimiento preventivo, contando con personal capacitado y herramientas adecuadas para la ejecución de las actividades. Se realizaron verificaciones mecánicas, eléctricas y funcionales, junto con los ajustes y mantenimientos necesarios para garantizar el correcto funcionamiento del puente grúa.",

  results:
    "Se logró realizar satisfactoriamente el montaje y mantenimiento preventivo del puente grúa, garantizando su adecuada operación y contribuyendo a la seguridad, confiabilidad y disponibilidad del sistema de izaje. El proyecto permitió fortalecer la experiencia de INGEVER ASOCIADOS S.A.S. en la ejecución de trabajos especializados de montaje, mantenimiento y puesta en servicio de equipos de izaje en proyectos de infraestructura de alta exigencia técnica.",

  specifications: [
    {
      label: "Servicio realizado",
      value: "Montaje y mantenimiento preventivo de puente grúa",
    },
    {
      label: "Proyecto",
      value: "Puente Pumarejo",
    },
    {
      label: "Ubicación",
      value: "Colombia",
    },
    {
      label: "Año",
      value: "2018",
    },
    {
      label: "Actividad",
      value: "Montaje, inspección y mantenimiento preventivo",
    },
    {
      label: "Estado",
      value: "Finalizado",
    },
  ],
},
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectIndex(slug) {
  return projects.findIndex((project) => project.slug === slug);
}
