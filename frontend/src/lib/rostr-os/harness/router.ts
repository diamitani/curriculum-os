import { streamText } from 'ai';
import { getProviderModel } from '../gateway';
import { PalManifest } from '../runtime/pal';
import { searchTier1Docs, searchTier3Community } from '../tools/rag-dal';

export async function RostrRouter(messages: any[], manifest: PalManifest) {
  // NPAO & 5D Phase Routing
  const { phase, priority_score } = manifest.classification;
  const { agent_type } = manifest.runtime;

  let systemPrompt = `You are the ROSTR OS ${agent_type.toUpperCase()} Agent.
Your current 5D Phase is: ${phase} (Priority Score: ${priority_score}).
Your Escalation Policy is: ${manifest.instructions.escalation_policy}.

Instructions:
${manifest.instructions.task_description}

Completion Criteria:
${manifest.instructions.completion_criteria.map(c => `- ${c}`).join('\n')}

Always adhere to the ROSTR Operating Rules: Use RAG DAL for ground truth, and escalate destructive actions.
`;

  // Determine tools based on phase and agent type (NPAO Routing)
  let activeTools = {};

  if (phase === 'Debugging' || agent_type === 'debugger') {
    // Necessity / Debugging
    // High priority, focused on resolving blockers.
    activeTools = { searchTier1Docs, searchTier3Community };
    systemPrompt += `\n\n[NPAO ROUTING: NECESSITY] You are resolving a critical blocker. Check Tier 1 docs for correct usage, and Tier 3 community sources for edge-case resolutions.`;
  } else if (phase === 'PreD' || phase === 'Design' || agent_type === 'designer' || agent_type === 'researcher') {
    // Anxiety / Planning
    // High cognitive drag, ambiguous specs.
    activeTools = { searchTier1Docs };
    systemPrompt += `\n\n[NPAO ROUTING: ANXIETY/PLANNING] You are in the research and design phase. You MUST rely ONLY on Tier 1 authoritative documentation. Never write production code during this phase.`;
  } else if (phase === 'Development' || agent_type === 'builder') {
    // Priority / Development
    // Building the core mission deliverables.
    // In a full implementation, we'd add filesystem and code execution tools here.
    systemPrompt += `\n\n[NPAO ROUTING: PRIORITY] You are actively developing. Ensure all constraints are followed.`;
  } else if (phase === 'Deployment' || agent_type === 'deployer') {
    // Opportunity / Deployment
    systemPrompt += `\n\n[NPAO ROUTING: OPPORTUNITY] You are executing deployment tasks. Ensure rollback plans are defined.`;
  }

  // Execute the agent run
  return streamText({
    model: getProviderModel(manifest.runtime.model === 'auto-select' ? 'gpt-4o' : manifest.runtime.model),
    system: systemPrompt,
    messages,
    tools: activeTools,
  });
}
