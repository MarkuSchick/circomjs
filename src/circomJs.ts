import { ConfigParser } from './configParser';
import { Circuit } from './circuit';
import path from 'path';

export default class CircomJS {
  private _configParser: ConfigParser;
  private _cIdToCircuit: Map<string, Circuit>;

  constructor(
    configFilePath = path.resolve(process.cwd(), './circuit.config.json'),
  ) {
    this._configParser = new ConfigParser(configFilePath);
    this._cIdToCircuit = new Map<string, Circuit>();

    this._configParser.listCircuitIds().map((cId) => {
      this._cIdToCircuit.set(
        cId,
        new Circuit(
          this._configParser.getCircuitConfigFromId(cId),
          this._configParser.getNetworks(),
        ),
      );
    });
  }

  getCIDs(): Array<string> {
    const cIDToCircuitsMap = this._cIdToCircuit;
    return Array.from(cIDToCircuitsMap.keys());
  }

  getCircuit(cID: string): Circuit {
    const ckt = this._cIdToCircuit.get(cID);
    if (!ckt) {
      throw new Error(`error: no circuit found for circuit ID => ${cID}`);
    }
    return ckt;
  }
}
