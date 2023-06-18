import { injectable } from "inversify";
import { TimeConverter } from "../../interfaces/utils"

@injectable()
export class TimeConverterImpl implements TimeConverter{
    public convert(time: string): number {
        let parts = time.split(":");
        let hours = parseInt(parts[0]);
        let minutes = parseInt(parts[1]);
        let seconds = parseInt(parts[2]);

        return hours * 3600 + minutes * 60 + seconds;
    }
}