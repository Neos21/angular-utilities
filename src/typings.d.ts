/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// JSON ファイルを import * as jsonFile from './example.json'; で読み込めるようにするため定義
declare module '*.json' {
  const value: any;
  export default value;
}
