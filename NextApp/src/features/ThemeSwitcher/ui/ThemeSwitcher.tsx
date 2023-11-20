import { useEffect, useRef, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button } from "@/shared/ui/Button";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { HStack } from "@/shared/ui/Stack";

interface ThemeSwitcherProps {
  className?: string;
}

export var ThemeSwitcher = function({ className }: ThemeSwitcherProps) {
  var { t } = useTranslation("common");
  var { theme, setTheme } = useTheme();
  var refButton = useRef<HTMLButtonElement>(null);

  // var [isMouseOnButton, setIsMouseOnButton] = useState(false);
  // var [key, setKey] = useState('');

  var onToggleHandler = function() {
    // setKey('click')
    setTheme(theme === "light" ? "dark" : "light");
  };

  // var onKeyDown = useCallback((e: KeyboardEvent) => {
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
    // <HStack gap="16">
      // <a
      //   href="javascript:;"
      //   onClick={onToggleHandler}
      // >
      //   Clickkk
      // </a>
      <button ref={refButton} onClick={onToggleHandler}>
        Click
      </button>
    // </HStack>
  );
};
