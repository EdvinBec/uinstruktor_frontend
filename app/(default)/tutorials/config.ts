export type ListItem = {
  id: string;
  header: string;
  description: string;
  code: string;
};

const variableDeclaration = `
  int number = 3;
  double floatingNumber  = 1.62;
  string text = "primer";
  bool isOpen = true;
  char letter = 'A';
  `;

const multipleVariablesInLine = `
  int x = 5, y = 3, z = 4;
  cout << x << y << z;
  `;

export const VariablesChapter: ListItem[] = [
  {
    id: "variables-declaration",
    header: "Deklaracija spremenljivk",
    description:
      "V C++ obstajajo tri različne vrste spremenjivk (definirane z različnimi besedami).",
    code: variableDeclaration,
  },
  {
    id: "variables-multiple-declaration",
    header: "Deklaracija več spremenljivk na enkrat",
    description:
      "Da ustvarite več spremenljivk na enkrat, morejo biti vsi istega tipa in morejo biti ločene z vejico.",
    code: multipleVariablesInLine,
  },
];
