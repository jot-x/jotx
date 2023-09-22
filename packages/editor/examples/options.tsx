import { jotxe } from '@jotx/editor';
jotxe(document.querySelector('#app')!, {
  doc: `# Hello\n\n An example of a document edited with _@jotx/editor_\n\n`,
  hooks: {
    beforeUpdate: (doc: string) => {
      // console.log('before hook', doc);
    },
    afterUpdate: (doc: string) => {
      // console.log('after hook', doc);
    }
  }
});
