import { storiesOf } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from '../app/component/button/button.component';
import { TransferComponent } from '../app/component/transfer/transfer.component';

storiesOf('my app/My Button', module)
  .add('with some emoji', () => ({
    component: ButtonComponent,
    props: {
      text: '😀 😎 👍 💯',
    },
  }))
  .add('with some emoji and action', () => ({
    component: ButtonComponent,
    props: {
      text: '😀 😎 👍 💯',
      click: action('clicked'),
    },
  }));

storiesOf('my app/My Transfer', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TransferComponent],
    })
  )
  .add('with some emoji', () => ({
    component: TransferComponent,
    props: {
      text: '😀 😎 👍 💯',
    },
  }))
  .add('with some emoji and action', () => ({
    component: TransferComponent,
    props: {
      text: '😀 😎 👍 💯',
      click: action('clicked'),
    },
  }));
