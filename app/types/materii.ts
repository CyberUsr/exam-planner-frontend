/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Materie {
  id_materie: string;
  nume_materie: string;
  specializationShortName: string;
  studyYear: string;
  groupName: string;
  professors?: any[];
  assistants?: any[];
  examene?: any[];
}

export interface MaterieFormData {
  nume_materie: string;
  specializationShortName: string;
  studyYear: string;
  groupName: string;
}
