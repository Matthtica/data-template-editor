"use client"
import { extractVariables, fillData, getTemplateByName } from "@/lib/utils";
import React from "react";
import DynamicInputList from "./components/dynamic-input-list";
import { DataMap } from "@/lib/types";
import { Button } from "@/components/ui/button";
import LinkButton from "@/components/custom/link-button";
import { PrinterChooser } from "./components/printer-chooser";

interface PrintRequest {
  printer_name: string,
  name: string,
  content: string
}

interface FillDataPageRouteParams {
  params: {
    template_name: string;
  };
}

export default function FillDataPage({ params }: FillDataPageRouteParams) {
  const stored_template = getTemplateByName(params.template_name);
  const variables = extractVariables(stored_template);

  const [content, setContent] = React.useState(stored_template);
  const [data, setData] = React.useState<DataMap>({});

  const [currentPrinter, setCurrentPrinter] = React.useState("");

  const handleInputChange = (variable: string, value: string) => {
    let tempdata = data;
    tempdata[variable] = value;
    setData(tempdata);
    let filledTemplate = fillData(stored_template, data);
    setContent(filledTemplate);
  }

  const sendPrintRequest = async () => {
    let body: PrintRequest = {
      printer_name: "EPSON L360 Series",
      name: params.template_name,
      content
    }

    await fetch("localhost:4590/print", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => console.log(res));
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
      <PrinterChooser value={currentPrinter} setValue={setCurrentPrinter}/>
      <div className="flex justify-end gap-2">
        <LinkButton href="/" variant="outline">Back</LinkButton>
        <Button onClick={sendPrintRequest}>Print</Button>
      </div>
    </div>
  </div>
}
