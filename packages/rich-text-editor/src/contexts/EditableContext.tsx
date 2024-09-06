import { createContext, ReactNode, useContext, useState } from "react";

type EditableContextType = {
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
};

const DEFAULT_EDITABLE_CONTEXT: EditableContextType = {
  editable: true,
  setEditable: () => {},
};

/**
 * Keep track of whether the editor is editable or not.
 *
 * Default value is {@link  DEFAULT_EDITABLE_CONTEXT}
 */
export const EditableContext = createContext<EditableContextType>(
  DEFAULT_EDITABLE_CONTEXT,
);

type EditableContextProviderProps = {
  children: ReactNode;
};

/**
 * Provides the EditableContext to its children.
 */
export function EditableContextProvider({
  children,
}: EditableContextProviderProps) {
  const [editable, setEditable] = useState<boolean>(true);

  return (
    <EditableContext.Provider value={{ editable, setEditable }}>
      {children}
    </EditableContext.Provider>
  );
}

/**
 * @returns EditableContex current value
 */
export function useEditableContext() {
  return useContext(EditableContext);
}
