// ROSTR PAL (Prompt Abstraction Layer) Compiler

export type PalStage = 'PreD' | 'Design' | 'Development' | 'Deployment' | 'Debugging';

export interface PalManifest {
  runtime: {
    agent_type: 'builder' | 'researcher' | 'reviewer' | 'designer' | 'deployer' | 'debugger';
    model: string;
    temperature: number;
  };
  instructions: {
    task_description: string;
    completion_criteria: string[];
    escalation_policy: 'require_approval' | 'auto_proceed' | 'human_in_the_loop';
  };
  tools_enabled: {
    allow: string[];
    deny: string[];
  };
  memory: {
    mode: 'session' | 'project' | 'persistent';
    context_sources: string[];
  };
  classification: {
    phase: PalStage;
    priority_score: number;
  };
}

/**
 * Mocks the compilation of natural language to a strictly typed PAL manifest.
 * In a real system, this would call an LLM (e.g., using AI SDK) to extract 
 * the intent, enhance semantics, and route to the correct agent.
 */
export async function compilePalManifest(userInput: string): Promise<PalManifest> {
  // Simple heuristic for demonstration purposes
  const lowerInput = userInput.toLowerCase();
  
  let phase: PalStage = 'Development';
  let agent_type: PalManifest['runtime']['agent_type'] = 'builder';
  
  if (lowerInput.includes('design') || lowerInput.includes('architect')) {
    phase = 'Design';
    agent_type = 'designer';
  } else if (lowerInput.includes('research') || lowerInput.includes('find')) {
    phase = 'PreD';
    agent_type = 'researcher';
  } else if (lowerInput.includes('fix') || lowerInput.includes('bug') || lowerInput.includes('error')) {
    phase = 'Debugging';
    agent_type = 'debugger';
  } else if (lowerInput.includes('deploy') || lowerInput.includes('ship')) {
    phase = 'Deployment';
    agent_type = 'deployer';
  }

  // Generate priority score based on ROSTR NPAO mapping
  // Necessity (10), Anxiety (7), Priority (5), Opportunity (3)
  let priority_score = 5;
  if (phase === 'Debugging') priority_score = 8.5; // Necessity
  if (phase === 'PreD') priority_score = 3; // Opportunity

  return {
    runtime: {
      agent_type,
      model: 'auto-select',
      temperature: 0.2,
    },
    instructions: {
      task_description: userInput,
      completion_criteria: [
        'Ensure constraints are strictly followed',
        'Verify against automated test schema'
      ],
      escalation_policy: phase === 'Deployment' ? 'require_approval' : 'auto_proceed',
    },
    tools_enabled: {
      allow: ['search_web', 'filesystem_read'],
      deny: ['production_db_drop', 'force_push_main'],
    },
    memory: {
      mode: 'session',
      context_sources: ['projects/core-app'],
    },
    classification: {
      phase,
      priority_score
    }
  };
}
