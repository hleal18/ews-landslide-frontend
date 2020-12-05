import React, { useContext, useState, useMemo } from "react";
import RiskZonesContext from "../Contexts/RiskZonesContext";
import AuthContext from "../Contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core"
import RiskZoneSelector from "../Presentational/Export/RiskZoneSelector";

import ewsApi from "../Api/ewsApi";

import * as xlsx from "xlsx";
import JSZip from "jszip";
import * as FileSaver from "file-saver";

const useStyles = makeStyles(theme => ({
  root: {
      marginTop: 48
  }
}));

const createWorkbooksForRiskZone = async (riskZone, token) => {
  console.log("Handling click");

  const workbooks = [];

  for (const cs of riskZone.criticalSpots) {
    for (const dv of cs.sensorNodes) {
      const variablesResult = await ewsApi.getVariablesInExcelFormat(token, dv.name);
      console.log("Result: ", variablesResult);
      console.log("Device: ", dv.name);
      if (variablesResult.length === 0) continue;

      const workbook = xlsx.utils.book_new();

      for (const varResult of variablesResult) {
        const newsheet = xlsx.utils.json_to_sheet([
          ['fecha', 'valor registrado'],
          ...varResult.variables
        ]);

        xlsx.utils.book_append_sheet(workbook, newsheet, varResult.name);
      }

      console.log("sheets", workbook.Sheets);
      workbooks.push({name: `${cs.name} - ${dv.name}.xlsx`, workbook });
      console.log('Workbook added for: ', dv.name);
    }
  }

  console.log("Numver of workbooks: ", workbooks.length);

  const zip = new JSZip();

  // zip.generateAsync({ type: 'blob' }).then((blob) => {
  //   FileSaver.saveAs(blob, "hola.zip");
  // });

  for (const workbook of workbooks) {
    // zip.file(workbook.name, xlsx.write(workbook.workbook, { type: "base64" }));
    zip.file(workbook.name, xlsx.write(workbook.workbook, { type: "array" }));
    // xlsx.writeFile(workbook.workbook, workbook.name);
  }

  const filesAsBlob = await zip.generateAsync({ type: 'blob' });

  FileSaver.saveAs(filesAsBlob, `Datos ${riskZone.name}`);
} 


const ExportManager = ({}) => {
  const { riskZones, setRiskZone } = useContext(RiskZonesContext);
  const { token } = useContext(AuthContext);
  const classes = useStyles();
  const [variables, setVariables] = useState([]);

  const [currentRiskZoneId, setCurrentRiskZoneId] = useState("");

  const riskZoneOptions = useMemo(() => [...riskZones.map((rz) => ({ id: rz._id, name: rz.name }))], [
    riskZones,
  ]);

  const handleClick = async () => {
    if (currentRiskZoneId === "") return;
    const rzToExport = riskZones.find((rz) => rz._id === currentRiskZoneId);
    if (!rzToExport) return;
    createWorkbooksForRiskZone(rzToExport, token);
  }

  return (
    <div className={classes.root}>
      <RiskZoneSelector
        riskZoneOptions={riskZoneOptions}
        currentId={currentRiskZoneId}
        handleChange={(v) => setCurrentRiskZoneId(v.target.value)}
        handleClick={handleClick}
      />
    </div>
  );
};

export default ExportManager;