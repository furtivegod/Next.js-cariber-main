export default function stringSplitLine(string: string) {
  return string.split(/\r\n|\n\r|\n|\r/)
}