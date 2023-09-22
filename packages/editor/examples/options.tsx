import { jotxe } from '@jotx/editor';
jotxe(document.querySelector('#root')!, {
  doc: '# Hello',
  hooks: {
    beforeUpdate: (doc: string) => {
      // console.log('before hook', doc);
    },
    afterUpdate: (doc: string) => {
      // console.log('after hook', doc);
    }
  }
});
