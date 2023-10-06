export const react_style_guide_rules = [
  {
    id: 0,
    rule: "Component file anatomy: Use TypeScript when creating new files and progressively replace (following the Leave it better than you found it rule) JavaScript files with typescript files. Use .tsx extension when you have TSX syntax in your files."
  },
  {
    id: 1,
    rul: "Amount of components: General rule: Follow the “1 component per file” rule.Exceptions: when secondary components (components that are only used by a main component exported on this file) are really small and the file size follows the Size rule"
  },
  {
    id: 2,
    rule: "File name: The component file name should match the component name, in PascalCase."
  },
  {
    id: 3,
    rule: "File size: Try to have small components, of about 200 lines of code or less as a soft limit."
  },
  {
    id: 4,
    rule: "Imports Position and order: All imports must be placed at the top of the file, divided between third-party modules (external modules that don’t belong to EB), first-party modules (external modules), and relative imports (modules from same package). All three sections are ordered alphabetically."
  },
  {
    id: 5,
    rule: "Importing always destructuring the modules when possible.When importing modules, use destructuring instead of importing the global reference."
  },
  { id: 6, rule: "Use named imports always." },
  {
    id: 7,
    rule: "Use functional components with hooks instead of class components"
  },
  {
    id: 8,
    rule: "React component is declared as a “const” and has a name always (we don’t use anonymous functions)"
  },
  {
    id: 9,
    rule: "Use React.FC (Functional Component) when the component can receive a “children” prop."
  },
  {
    id: 10,
    rule: "Use React.VFC (Void Functional Component) when the component CAN’T receive a “children” prop."
  },
  {
    id: 11,
    rule: "The props are passed in React.FC<Props> generic param when they exist."
  },
  {
    id: 12,
    rule: "Props are defined in an interface above the component that is always named with the component name followed by “Props“."
  },
  { id: 13, rule: "The component is exported without the default keyword." },
  { id: 14, rule: "The component const name is PascalCase" },
  {
    id: 15,
    rule: "Properties.Number of properties: Keep the API surface as small as possible. (5 or fewer properties for each component)."
  },
  {
    id: 16,
    rule: "Property access: Use properties destructuring instead of reference all via the “props” parameters variable."
  },
  {
    id: 17,
    rule: "Property default values: Assign default values directly when you’re destructuring the props."
  },
  {
    id: 18,
    rule: "Pass strictly used information: All props information should be used by the component. The component doesn’t declare in the props type more information than needed."
  },
  {
    id: 19,
    rule: "Property types: Define specific component property types"
  },
  {
    id: 20,
    rule: "Property params: Encapsulate primitive property param in more abstract property types"
  },
  {
    id: 21,
    rule: "Property values transmission: Use explicitly named params instead of props spread"
  },
  {
    id: 22,
    rule: "Methods. Nested render methods: Extract them and convert them into components"
  },
  {
    id: 23,
    rule: "Logic methods: Extract logic methods when possible (when they are not heavily using scope variables) and pass the values from the state and props as arguments"
  },
  {
    id: 24,
    rule: "Event handlers: Event handler method names should express the intention, “what it does”. This is a recommendation and is aspirational but there could be exceptions, treat with care."
  },
  {
    id: 25,
    rule: "Rendering. Guard clauses. Use render guard clauses when possible if you have a conditional rendering based on a condition that can be early checked. If you use a render guard clause, put it close to the final render return."
  },
  {
    id: 26,
    rule: "Conditional rendering. Use real boolean short-circuit expressions and operators when you need to render something or nothing"
  },
  {
    id: 27,
    rule: "Nested conditions: Extract the ternary logic (inside the render section when rendering JSX, especially if is complex) to another component and use guard clauses"
  }
];
