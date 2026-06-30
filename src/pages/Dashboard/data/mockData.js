// substituir cada função por uma chamada à API real
// Exemplo: export const fetchUsuario = () => api.get("/usuario")

export const mockUsuario = {
  nome: "DunDum",
  iniciais: "D",
  email: "oficialdundum@gmail.com",
};

export const mockPet = {
  nome: "Juju",
  raca: "Bulldog",
  idade: "3 anos",
  sexo: "Fêmea",
  peso: "8kg",
  coleira: "COLEIRA0001",
  foto: null,
  ativo: true,
};

export const mockBatimentos = [
  { hora: "00h", valor: 72, min: 65, max: 78 },
  { hora: "02h", valor: 68, min: 62, max: 74 },
  { hora: "04h", valor: 65, min: 60, max: 70 },
  { hora: "06h", valor: 70, min: 65, max: 75 },
  { hora: "08h", valor: 85, min: 78, max: 95 },
  { hora: "10h", valor: 92, min: 84, max: 102 },
  { hora: "12h", valor: 88, min: 80, max: 98 },
  { hora: "14h", valor: 95, min: 86, max: 108 },
  { hora: "16h", valor: 90, min: 82, max: 100 },
  { hora: "18h", valor: 87, min: 79, max: 96 },
  { hora: "20h", valor: 82, min: 74, max: 90 },
  { hora: "22h", valor: 75, min: 68, max: 82 },
];

export const mockRespiracao = [
  { hora: "00h", valor: 22 },
  { hora: "02h", valor: 20 },
  { hora: "04h", valor: 18 },
  { hora: "06h", valor: 21 },
  { hora: "08h", valor: 26 },
  { hora: "10h", valor: 28 },
  { hora: "12h", valor: 27 },
  { hora: "14h", valor: 30 },
  { hora: "16h", valor: 29 },
  { hora: "18h", valor: 27 },
  { hora: "20h", valor: 25 },
  { hora: "22h", valor: 23 },
];

export const mockPassos = [
  { dia: "Seg", valor: 4200, meta: 5000 },
  { dia: "Ter", valor: 5800, meta: 5000 },
  { dia: "Qua", valor: 3900, meta: 5000 },
  { dia: "Qui", valor: 6200, meta: 5000 },
  { dia: "Sex", valor: 7100, meta: 5000 },
  { dia: "Sáb", valor: 5400, meta: 5000 },
  { dia: "Dom", valor: 6842, meta: 5000 },
];

export const mockSono = [
  { hora: "22h", profundo: 0, leve: 20, rem: 0, acordado: 0 },
  { hora: "23h", profundo: 40, leve: 10, rem: 5, acordado: 5 },
  { hora: "00h", profundo: 50, leve: 5, rem: 0, acordado: 5 },
  { hora: "01h", profundo: 30, leve: 20, rem: 10, acordado: 0 },
  { hora: "02h", profundo: 10, leve: 30, rem: 20, acordado: 0 },
  { hora: "03h", profundo: 5, leve: 10, rem: 40, acordado: 5 },
  { hora: "04h", profundo: 20, leve: 15, rem: 20, acordado: 5 },
  { hora: "05h", profundo: 0, leve: 5, rem: 5, acordado: 50 },
];

export const mockRelatorio = {
  periodo: "8-14 Mar",
  mediaBatimentos: "89 bpm",
  mediaPassos: "5.940",
  mediaRespiracao: "22 rpm",
  mediaAtividade: "74%",
  padraoDeSono: "8h 45min",
};

export const mockNotificacoes = [
  {
    id: 1,
    texto: "Batimentos acima do normal detectados às 14h32",
    quando: "hoje",
    lido: false,
  },
  {
    id: 2,
    texto: "Respiração acima do normal (28 rpm) às 14h20",
    quando: "hoje",
    lido: false,
  },
  { id: 3, texto: "Bateria da coleira em 78%", quando: "ontem", lido: true },
  {
    id: 4,
    texto: "Pouca atividade detectada entre 10h-12h",
    quando: "ontem",
    lido: true,
  },
  { id: 5, texto: "Relatório semanal disponível", quando: "seg", lido: true },
];

export const mockBateria = 78;

export const mockPetPos = [-23.673284, -46.698625];
