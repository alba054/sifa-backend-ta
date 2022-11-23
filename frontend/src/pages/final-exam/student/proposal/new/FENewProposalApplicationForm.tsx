import { Stack, Title } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { RadioGroup, SelectInput, TextInput } from "src/components/FormInput";
import { IFENewProposalFormValues } from "./FENewProposalInterfaces";

interface IFEProposalApplicationFormProps {
  title: string;
  errors: {
    [key in `${keyof IFENewProposalFormValues}.${keyof TOffer}`]: string;
  };
  value: TOffer;
  onChange: (val: TOffer) => void;
  name: keyof Pick<IFENewProposalFormValues, "firstOffer" | "secondOffer">;
}

export type TProposalIdeaOrigin = "SELF" | "LECTURER";

export type TOffer = {
  title: string;
  firstLaboratory: string;
  secondLaboratory: string;
  proposalIdeaOrigin: TProposalIdeaOrigin;
  lecturer?: TProposalIdeaOrigin;
};

const FEProposalApplicationForm: React.FC<IFEProposalApplicationFormProps> = ({
  title,
  errors,
  value,
  onChange,
  name,
}) => {
  // Used to prevent first run logic handler on useEffect
  const firstRun = useRef(true);
  const [state, setState] = useState<TOffer>(value || ({} as TOffer));

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    onChange(state);
  }, [state]);

  function handleInputChange(name: keyof TOffer, value: any) {
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <Stack spacing={"md"}>
      <Title order={3}>{title}</Title>
      <TextInput
        required
        label="Judul Tugas Akhir"
        placeholder="Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial"
        error={errors?.[`${name}.${"title" as keyof TOffer}`]}
        name={"title" as keyof TOffer}
        onChange={(e) =>
          handleInputChange("title" as keyof TOffer, e.target.value)
        }
        value={value?.title}
        size={"md"}
      />

      <div className={`grid grid-cols-2 gap-x-12`}>
        <SelectInput
          data={[
            { label: "Lab 1", value: "1" },
            { label: "Lab 2", value: "2" },
          ]}
          required
          placeholder="Biofarmaka"
          label="Laboratorium 1"
          error={errors?.[`${name}.${"firstLaboratory" as keyof TOffer}`]}
          name={"firstLaboratory" as keyof TOffer}
          onChange={(e) =>
            handleInputChange("firstLaboratory" as keyof TOffer, e)
          }
          value={value?.firstLaboratory}
          size={"md"}
        />
        <SelectInput
          data={[
            { label: "Lab 1", value: "1" },
            { label: "Lab 2", value: "2" },
          ].filter((lab) => lab.value !== value?.firstLaboratory)}
          placeholder="Pilih laboratorium kedua jika diperlukan"
          label="Laboratorium 2"
          error={errors?.[`${name}.${"secondLaboratory" as keyof TOffer}`]}
          name={"secondLaboratory" as keyof TOffer}
          onChange={(e) =>
            handleInputChange("secondLaboratory" as keyof TOffer, e)
          }
          disabled={!value?.firstLaboratory}
          value={value?.secondLaboratory}
          size={"md"}
        />
      </div>

      <div className={`grid grid-cols-4`}>
        <RadioGroup
          required
          label="Asal Usulan"
          error={errors?.[`${name}.${"proposalIdeaOrigin" as keyof TOffer}`]}
          name={`${name}.${"proposalIdeaOrigin" as keyof TOffer}`}
          value={state.proposalIdeaOrigin}
          onChange={(e) =>
            handleInputChange("proposalIdeaOrigin" as keyof TOffer, e)
          }
          data={[
            {
              label: "Sendiri",
              value: "SELF",
            },
            {
              label: "Dosen",
              value: "LECTURER",
            },
          ]}
          size={"md"}
        />

        {state.proposalIdeaOrigin === "LECTURER" && (
          <SelectInput
            data={[
              {
                label: "Pak Hendra",
                value: "nip 12832344",
              },
              {
                label: "Pak Armin",
                value: "nip 39242342",
              },
            ]}
            className={`col-span-3`}
            placeholder="Pilih laboratorium kedua jika diperlukan"
            label="Dosen Pengusul"
            error={errors?.[`${name}.${"lecturer" as keyof TOffer}`]}
            name={"lecturer" as keyof TOffer}
            onChange={(e) => handleInputChange("lecturer" as keyof TOffer, e)}
            disabled={state.proposalIdeaOrigin !== "LECTURER"}
            value={value?.lecturer}
            size={"md"}
          />
        )}
      </div>
    </Stack>
  );
};
export default FEProposalApplicationForm;
