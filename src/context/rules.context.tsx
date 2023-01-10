import React, { useContext, useState } from "react";

import { DEFAULT_RULES } from "../utils/checkout/constants";
import { type CustomRule } from "../utils/checkout";

interface ContextProps {
  children: React.ReactNode;
}

type RulesContextType = {
  rules: CustomRule[];
};

export const RulesContext = React.createContext<RulesContextType | undefined>(
  undefined
);

export const RulesProvider = ({ children }: ContextProps) => {
  const [rules] = useState(DEFAULT_RULES);

  return (
    <RulesContext.Provider value={{ rules }}>{children}</RulesContext.Provider>
  );
};

export const useRules = () => {
  const hook = useContext(RulesContext);
  if (!hook) {
    throw new Error("useRules must be inside a Provider with a value");
  }
  return hook;
};
