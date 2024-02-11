import { SelectedScript } from '@/application/Context/State/Selection/Script/SelectedScript';
import { ReadonlyScriptSelection, ScriptSelection } from '@/application/Context/State/Selection/Script/ScriptSelection';
import { ScriptSelectionChange } from '@/application/Context/State/Selection/Script/ScriptSelectionChange';
import { RevertStatusType } from './RevertStatusType';

export function setCurrentRevertStatus(
  revert: boolean,
  selection: ScriptSelection,
) {
  const { selectedScripts } = selection;
  const reversibleScripts = getReversibleScripts(selectedScripts);
  selection.processChanges({
    changes: reversibleScripts.map((script): ScriptSelectionChange => ({
      scriptId: script.id,
      newStatus: {
        isSelected: true,
        isReverted: revert,
      },
    })),
  });
}

export function getCurrentRevertStatus(
  selection: ReadonlyScriptSelection,
): RevertStatusType {
  const allRevertStatuses = getReversibleScripts(selection.selectedScripts)
    .map((script) => script.revert);
  if (!allRevertStatuses.length) {
    return RevertStatusType.NothingIsReversible;
  }
  if (allRevertStatuses.every((c) => c === true)) {
    return RevertStatusType.AllReverted;
  }
  if (allRevertStatuses.every((c) => c === false)) {
    return RevertStatusType.NoneReverted;
  }
  return RevertStatusType.SomeReverted;
}

function getReversibleScripts(scripts: readonly SelectedScript[]) {
  return scripts.filter((script) => script.script.canRevert());
}
