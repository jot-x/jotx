import { jotxe } from '@jotx/editor';
jotxe(document.querySelector('#root')!, {
  doc: '# Hello',
  hooks: {
    beforeUpdate: (doc) => {
      doc += ' world';
      console.log('before hook', doc);
    },
    afterUpdate: (doc) => {
      console.log('after hook', doc);
    }
  }
});
