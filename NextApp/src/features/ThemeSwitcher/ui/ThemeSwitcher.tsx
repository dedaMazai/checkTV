import { useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useCallback } from "react";

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { t } = useTranslation("common");
  const { theme, setTheme } = useTheme();
  const refButton = useRef<HTMLButtonElement>(null);

  // const [isMouseOnButton, setIsMouseOnButton] = useState(false);
  // const [key, setKey] = useState('');

  const onToggleHandler = useCallback(() => {
    // setKey('click')
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  // const onKeyDown = useCallback((e: KeyboardEvent) => {
  //   setKey(e.key)
  //   if (e.key === "Enter" && isMouseOnButton) {
  //     refButton.current?.click();
  //   }
  // }, [isMouseOnButton]);

  // useEffect(() => {
  //   document.addEventListener("keydown", onKeyDown);

  //   return () => {
  //     document.removeEventListener("keydown", onKeyDown);
  //   };
  // }, [onKeyDown]);

  // useEffect(() => {
  //   refButton.current?.addEventListener('mouseenter', () => {setIsMouseOnButton(true)});
  //   refButton.current?.addEventListener("mouseleave", () => {setIsMouseOnButton(false)});

  //   return () => {
  //     refButton.current?.removeEventListener("mouseenter", () => {setIsMouseOnButton(true)});
  //     refButton.current?.removeEventListener("mouseleave", () => {setIsMouseOnButton(false)});
  //   };
  // }, [onKeyDown]);

  return (
    // <input  type='button' onKeyDown={(e) => something(e) } value="11111S" />
    // <Button
    //   variant="clearGrey"
    //   className={classNames(className)}
    //   onClick={onToggleHandler}
    //   fullHeight
    // >
    //   {t("qqq")}
    // </Button>
    // <a
    //   href="javascript:;"
    //   onMouseUp={onToggleHandler.bind(this)}
    //   onTouchEnd={onToggleHandler.bind(this)}
    //   onClick={onToggleHandler}
    //   onContextMenu={onToggleHandler}
    //   onDoubleClick={onToggleHandler}
    //   onDrag={onToggleHandler}
    //   onDragEnd={onToggleHandler}
    //   onDragEnter={onToggleHandler}
    //   onDragExit={onToggleHandler}
    //   onDragLeave={onToggleHandler}
    //   onDragOver={onToggleHandler}
    //   onDragStart={onToggleHandler}
    //   onDrop={onToggleHandler}
    //   onMouseDown={onToggleHandler}
    //   onMouseEnter={onToggleHandler}
    //   onMouseLeave={onToggleHandler}
    // >
    //   Clickkk
    // </a>
    <button ref={refButton} onClick={onToggleHandler}>
      {`${t("qqq")}`}
    </button>
  );
};
