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

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { t } = useTranslation("common");
  const { theme, setTheme } = useTheme();
  const refButton = useRef<HTMLButtonElement>(null);

  // const [isMouseOnButton, setIsMouseOnButton] = useState(false);
  // const [key, setKey] = useState('');

  const onToggleHandler = function() {
    // setKey('click')
    setTheme(theme === "light" ? "dark" : "light");
  };

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
    <HStack gap="16">
      {/* <a
        href="javascript:;"
        onClick={onToggleHandler}
      >
        Clickkk
      </a> */}
      <button ref={refButton} onClick={onToggleHandler}>
        {`${t("Click")}`}
      </button>
    </HStack>
  );
};
