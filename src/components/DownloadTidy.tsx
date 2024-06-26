import {
  Box,
  Button,
  Flex,
  Modal,
  MultiSelect,
  Text,
} from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { IconTable } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';
import merge from 'lodash.merge';
import { StorageEngine } from '../storage/engines/StorageEngine';
import { ParticipantData } from '../storage/types';
import { useStorageEngine } from '../store/storageEngineHooks';
import { Prettify, StudyConfig } from '../parser/types';
import { isInheritedComponent } from '../parser/parser';

export const OPTIONAL_COMMON_PROPS = [
  'description',
  'instruction',
  'answer',
  'correctAnswer',
  'startTime',
  'endTime',
  'duration',
  'taskOrder',
] as const;

export const REQUIRED_PROPS = [
  'participantId',
  'trialId',
  'responseId',
] as const;

type OptionalProperty = (typeof OPTIONAL_COMMON_PROPS)[number];
type RequiredProperty = (typeof REQUIRED_PROPS)[number];
type MetaProperty = `meta-${string}`;

export type Property = OptionalProperty | RequiredProperty | MetaProperty;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TidyRow = Prettify<Record<RequiredProperty, any> & Partial<Record<OptionalProperty | MetaProperty, any>>>;

export function download(graph: string, filename: string) {
  const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(graph)}`;
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', filename);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function processToRow(session: ParticipantData, studyConfig: StudyConfig, properties: Property[]): TidyRow[] {
  return Object.entries(session.answers).map(([trialIdentifier, trialAnswer]) => {
    // Get the whole component, including the base component if there is inheritance
    const trialId = trialIdentifier.split('_')[0];
    const seq = trialIdentifier.split('_')[1];
    const trialConfig = studyConfig.components[trialId];
    const completeComponent = isInheritedComponent(trialConfig) && trialConfig.baseComponent && studyConfig.baseComponents ? merge({}, studyConfig.baseComponents[trialConfig.baseComponent], trialConfig) : trialConfig;

    const duration = trialAnswer.endTime - trialAnswer.startTime;

    const rows = Object.entries(trialAnswer.answer).map(([key, value]) => {
      const tidyRow: TidyRow = {
        participantId: session.participantId,
        trialId,
        responseId: key,
        startTime: new Date(trialAnswer.startTime).toUTCString(),
        endTime: new Date(trialAnswer.endTime).toUTCString(),
        duration,
      };

      if (properties.includes('description')) {
        tidyRow.description = completeComponent.description;
      }
      if (properties.includes('instruction')) {
        tidyRow.instruction = completeComponent.instruction;
      }
      if (properties.includes('answer')) {
        tidyRow.answer = value;
      }
      if (properties.includes('correctAnswer')) {
        tidyRow.correctAnswer = completeComponent.correctAnswer;
      }
      if (properties.includes('taskOrder')) {
        tidyRow.taskOrder = seq;
      }

      return tidyRow;
    }).flat();

    return rows;
  }).flat();
}

export async function downloadTidy(
  filename: string,
  storageEngine: StorageEngine,
  studyConfig: StudyConfig,
  data: ParticipantData[] | undefined,
  properties: Property[] = [...REQUIRED_PROPS, ...OPTIONAL_COMMON_PROPS],
) {
  const allParticipantData = data || await storageEngine.getAllParticipantsData();

  const rows = allParticipantData
    .map((participantSession) => processToRow(participantSession, studyConfig, properties))
    .flat();

  const escapeDoubleQuotes = (s: string) => s.replace(/"/g, '""');

  const csvRows = rows.map((row) => properties
    .map((header) => {
      if (row === null) {
        return '';
      } if (typeof row[header] === 'string') {
        return `"${escapeDoubleQuotes(row[header])}"`;
      }
      return JSON.stringify(row[header]);
    })
    .join(','));
  const csv = [properties.join(','), ...csvRows].join('\n');

  download(csv, filename);
}

type Props = {
  opened: boolean;
  close: () => void;
  filename: string;
  studyConfig: StudyConfig;
  data?: ParticipantData[];
};

export function DownloadTidy({
  opened, close, filename, studyConfig, data,
}: Props) {
  const [selectedProperties, setSelectedProperties] = useInputState<
    Array<Property>
  >([...REQUIRED_PROPS, ...OPTIONAL_COMMON_PROPS]);

  const setSelected = useCallback((values: Property[]) => {
    if (REQUIRED_PROPS.every((rp) => values.includes(rp))) setSelectedProperties(values);
  }, [setSelectedProperties]);

  const combinedProperties = useMemo(() => [...REQUIRED_PROPS, ...OPTIONAL_COMMON_PROPS], []);

  const { storageEngine } = useStorageEngine();

  if (!storageEngine) return null;

  return (
    <Modal
      opened={opened}
      size="lg"
      onClose={close}
      title={<Text size="xl">Download Tidy CSV</Text>}
      centered
      radius="md"
      padding="xl"
    >
      <Box>
        <MultiSelect
          searchable
          limit={30}
          nothingFound="Property not found"
          data={combinedProperties}
          value={selectedProperties}
          onChange={setSelected}
          label={(
            <Text fw="bold" size="lg">
              Select properties to include in tidy csv:
            </Text>
          )}
          placeholder="Select atleast one property"
        />
      </Box>

      <Flex
        mt="xl"
        direction={{
          base: 'column',
          sm: 'row',
        }}
        gap={{
          base: 'sm',
          sm: 'lg',
        }}
        justify={{
          sm: 'space-around',
        }}
      >
        <Button
          leftIcon={<IconTable />}
          onClick={() => downloadTidy(filename, storageEngine, studyConfig, data, selectedProperties)}
        >
          Download
        </Button>
        <Button onClick={close} color="red">
          Close
        </Button>
      </Flex>
    </Modal>
  );
}
