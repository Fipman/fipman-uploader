import Vue from 'vue'
import ProgressBar from '@/components/ProgressBar'
import { getRenderedComponent } from '../helper';

describe('ProgressBar.vue', () => {
  it('should set %0 as default value', () => {
    const vm = getRenderedComponent(ProgressBar);
    expect(vm.value).to.equal(0);
  });

  it('should render correct value', (done) => {
    const vm = getRenderedComponent(ProgressBar, { value : 10});
    expect(vm.value).to.equal(10);
    expect(vm.$el.querySelector('div').style.width).to.equal('10%');

    vm.value = 40;
    
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('div').style.width).to.equal('40%');
      done()
    })
  });
})
