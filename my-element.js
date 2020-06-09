import {LitElement, html, css} from 'lit-element';

import 'vuerd';
import poll from './utils';

const myData = {
  canvas: {
    width: 2000,
    height: 2000,
    scrollTop: 0,
    scrollLeft: 6,
    show: {
      tableComment: true,
      columnComment: true,
      columnDataType: true,
      columnDefault: true,
      columnAutoIncrement: true,
      columnPrimaryKey: true,
      columnUnique: true,
      columnNotNull: true,
      relationship: true,
    },
    database: 'MySQL',
    databaseName: '',
    canvasType: 'ERD',
    language: 'GraphQL',
    tableCase: 'pascalCase',
    columnCase: 'camelCase',
    setting: {
      relationshipDataTypeSync: true,
      columnOrder: [
        'columnName',
        'columnDataType',
        'columnNotNull',
        'columnUnique',
        'columnAutoIncrement',
        'columnDefault',
        'columnComment',
      ],
    },
  },
  table: {
    tables: [
      {
        name: 'Users',
        comment: '',
        columns: [
          {
            name: 'email',
            comment: '',
            dataType: 'VARCHAR',
            default: '',
            option: {
              autoIncrement: false,
              primaryKey: false,
              unique: false,
              notNull: false,
            },
            ui: {
              active: false,
              pk: false,
              fk: false,
              pfk: false,
              widthName: 60,
              widthComment: 60,
              widthDataType: 65,
              widthDefault: 60,
            },
            id: 'ceafba3d-ee48-69a2-fc80-784eefaa3754',
          },
          {
            name: '',
            comment: '',
            dataType: '',
            default: '',
            option: {
              autoIncrement: false,
              primaryKey: true,
              unique: false,
              notNull: true,
            },
            ui: {
              active: false,
              pk: true,
              fk: false,
              pfk: false,
              widthName: 60,
              widthComment: 60,
              widthDataType: 60,
              widthDefault: 60,
            },
            id: '067fc487-f538-e766-0fb4-6b65c19f4a96',
          },
        ],
        ui: {
          active: false,
          left: 135,
          top: 74,
          zIndex: 74,
          widthName: 60,
          widthComment: 60,
        },
        id: 'bd10289b-feab-7e24-0250-4e95e0484cde',
      },
      {
        name: 'Threads',
        comment: '',
        columns: [
          {
            name: 'id',
            comment: '',
            dataType: 'BIGINT',
            default: '',
            option: {
              autoIncrement: false,
              primaryKey: true,
              unique: false,
              notNull: true,
            },
            ui: {
              active: false,
              pk: true,
              fk: false,
              pfk: false,
              widthName: 60,
              widthComment: 60,
              widthDataType: 60,
              widthDefault: 60,
            },
            id: '5035b545-ea75-b895-d01f-a69459629465',
          },
          {
            name: '',
            comment: '',
            dataType: '',
            default: '',
            option: {
              autoIncrement: false,
              primaryKey: false,
              unique: false,
              notNull: false,
            },
            ui: {
              active: false,
              pk: false,
              fk: false,
              pfk: false,
              widthName: 60,
              widthComment: 60,
              widthDataType: 60,
              widthDefault: 60,
            },
            id: 'dfc22541-f204-7cfc-398d-db20f475e4db',
          },
          {
            name: '',
            comment: '',
            dataType: '',
            default: '',
            option: {
              autoIncrement: false,
              primaryKey: false,
              unique: false,
              notNull: false,
            },
            ui: {
              active: false,
              pk: false,
              fk: true,
              pfk: false,
              widthName: 60,
              widthComment: 60,
              widthDataType: 60,
              widthDefault: 60,
            },
            id: 'd34ee6d9-c88e-10fc-6848-3abff2c85296',
          },
        ],
        ui: {
          active: false,
          left: 584,
          top: 281,
          zIndex: 77,
          widthName: 60,
          widthComment: 60,
        },
        id: '1d546243-1d66-e976-9d9a-c3597b57c0f5',
      },
    ],
  },
  memo: {
    memos: [],
  },
  relationship: {
    relationships: [
      {
        identification: false,
        start: {
          tableId: 'bd10289b-feab-7e24-0250-4e95e0484cde',
          columnIds: ['067fc487-f538-e766-0fb4-6b65c19f4a96'],
          x: 534,
          y: 129,
          direction: 'right',
        },
        end: {
          tableId: '1d546243-1d66-e976-9d9a-c3597b57c0f5',
          columnIds: ['d34ee6d9-c88e-10fc-6848-3abff2c85296'],
          x: 584,
          y: 346.25,
          direction: 'left',
        },
        id: 'c2bd4fc9-8fc2-6112-8b59-8bed95e26d4f',
        relationshipType: 'ZeroOneN',
      },
    ],
  },
};

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * The data for the ERD.
       */
      ERData: {type: Object},

      /**
       * The erd-editor component.
       */
      erdEditor: {type: Object},
    };
  }

  constructor() {
    super();

    this.ERData = {};
    this.erdEditor = {};
    this.fetchData = this.fetchData.bind(this);
  }

  // connectedCallback() {
  //   console.log('connectedCallback');
  //   super.connectedCallback();

  //   setInterval(() => this.fetchData(), 2000);
  // }

  async getData(url = '', data = {}) {
    const response = await fetch(url);

    const jsonResponse = await response.json();

    return JSON.stringify(jsonResponse);
  }

  async postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });

    return await response.json();
  }

  async firstUpdated() {
    this.erdEditor = this.shadowRoot.querySelector('#editor');

    this.erdEditor.sharePull((commands) => console.log(commands));
    await poll({
      fn: this.fetchData,
      validate: (response) => !!response,
      interval: 50,
    });

    // this.fetchData();
  }

  async fetchData() {
    this.ERData = await this.getData('http://localhost:3000/data');
  }

  render() {
    return html` <div>
      <erd-editor
        id="editor"
        .value="${this.ERData}"
        @change="
      ${() =>
          this.postData(
            'http://localhost:3000/data',
            this.erdEditor && this.erdEditor.value
          )}"
      ></erd-editor>
    </div>`;
  }
}

window.customElements.define('my-element', MyElement);
