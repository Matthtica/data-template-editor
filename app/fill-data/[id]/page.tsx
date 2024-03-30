"use client"
import { extractVariables } from "@/lib/utils";
import React from "react";
import DynamicInputList from "@/components/custom/dynamic-input-list";
import { Button } from "@/components/ui/button";
import LinkButton from "@/components/custom/link-button";
import { useTemplateStorageContext } from "@/context/TemplateStorageContext";
import { useTemplateInputData } from "@/lib/hooks";

interface FillDataPageRouteParams {
  params: {
    id: string;
  };
}

export default function FillDataPage({ params }: FillDataPageRouteParams) {
  const { getTemplate } = useTemplateStorageContext();
  const current_template = getTemplate(params.id);
  if (!current_template) return <div>No template found</div>;
  const variables = extractVariables(current_template.content);
  const { content, data, handleInputChange } = useTemplateInputData(current_template.content);

  const sendPrintRequest = async () => {
    console.log("Printing is not implemented yet")
  }

  return <div className="flex h-screen p-2 gap-2 portrait:flex-col" >
    <div id="content" dangerouslySetInnerHTML={{ __html: content}} className="flex-1 rounded-md border border-input p-2">
    </div>
    <div className="flex-2 rounded-md border border-input p-2 flex flex-col justify-between">
      <DynamicInputList
        className=""
        variables={variables}
        data={data}
        onInputChange={handleInputChange}/>
      <div className="flex justify-end gap-2">
        <LinkButton href="/" variant="outline">Back</LinkButton>
        <Button onClick={sendPrintRequest}>Print</Button>
      </div>
    </div>
  </div>
}
