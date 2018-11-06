import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { ButtonComponent } from '../app/component/button/button.component';

storiesOf('My Button', module)
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
