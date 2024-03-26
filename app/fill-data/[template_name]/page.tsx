"use client"
import { extractVariables, fillData, getTemplateByName } from "@/lib/utils";
import React from "react";
import DynamicInputList from "./components/dynamic-input-list";
import { DataMap } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import LinkButton from "@/components/custom/link-button";

interface FillDataPageRouteParams {
  params: {
    template_name: string;
  };
}

export default function FillDataPage({ params }: FillDataPageRouteParams) {
  const stored_template = getTemplateByName(params.template_name);
  const variables = extractVariables(stored_template);
  const doc = new jsPDF();

  const [content, setContent] = React.useState(stored_template);
  const [data, setData] = React.useState<DataMap>({});


  const handleInputChange = (variable: string, value: string) => {
    let tempdata = data;
    tempdata[variable] = value;
    setData(tempdata);
    let filledTemplate = fillData(stored_template, data);
    setContent(filledTemplate);
  }

  const saveAsPdf = () => {
    doc.html(content).save(params.template_name + ".pdf");
  }

  return <div className="flex h-screen p-2 gap-2 portrait:flex-col" >
    <div id="content" dangerouslySetInnerHTML={{ __html: content}} className="flex-1 rounded-md border border-input p-2">
    </div>
    <div className="flex-1 rounded-md border border-input p-2 flex flex-col justify-between">
      <DynamicInputList
        className=""
        variables={variables}
        data={data}
        onInputChange={handleInputChange}/>
      <div className="flex justify-end gap-2">
        <LinkButton href="/" variant="outline">Back</LinkButton>
        <Button onClick={saveAsPdf}>Save</Button>
      </div>
    </div>
  </div>
}
