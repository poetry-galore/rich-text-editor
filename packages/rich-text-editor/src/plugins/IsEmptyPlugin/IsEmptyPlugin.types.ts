export interface IsEmptyPluginProps {
  /**
   * React state update function for setting whether the is empty.
   * Updates the state value to whether the editor is empty.
   *
   * @example
   * const [isEmpty, setIsEmpty] = useState<boolean>()
   *
   * <RichTextEditor setIsEmpty={setIsEmpty} />
   */
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}
