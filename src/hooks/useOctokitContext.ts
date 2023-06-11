import { MutableRefObject, createContext, useContext } from 'react'
import { Octokit } from "@octokit/core";

export const OctokitContext = createContext<Octokit | null>(null)

export function useOctokitContext() {
  return useContext(OctokitContext)
}
