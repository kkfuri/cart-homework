import React, { useContext, useState } from "react";

import { DEFAULT_RULES } from "../utils/checkout/constants";
import { type CustomRule } from "../utils/checkout";

interface ContextProps {
  children: React.ReactNode;
}

type RulesContextType = {
  rules: Record<string, CustomRule>;
  createRule: (sku: string, rule: CustomRule) => void;
  removeRule: (sku: string) => void;
};

export const RulesContext = React.createContext<RulesContextType | undefined>(
  undefined
);

export const RulesProvider = ({ children }: ContextProps) => {
  const [rules, setRules] = useState(DEFAULT_RULES);

  function createRule(sku: string, rule: CustomRule) {
    setRules((v) => ({ ...v, [sku]: rule }));
  }

  function removeRule(sku: string) {
    setRules((v) => {
      const copy = { ...v };
      delete copy[sku as keyof typeof rules];
      return copy;
    });
  }

  return (
    <RulesContext.Provider value={{ rules, createRule, removeRule }}>
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => {
  const hook = useContext(RulesContext);
  if (!hook) {
    throw new Error("useRules must be inside a Provider with a value");
  }
  return hook;
};
