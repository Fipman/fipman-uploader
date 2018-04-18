import Vue from 'vue';
import ProgressCircle from '@/components/ProgressCircle'
import { getRenderedComponent } from '../helper';



describe('ProgressCircle.vue', ()=>{
  it('should set %0 as default value', () => {
    const vm = getRenderedComponent(ProgressCircle);
    expect(vm.value).to.equal(0);
  });

  it('should compute currentProgress for circular vector', () => {
    const vm = getRenderedComponent(ProgressCircle, { value : 10});
    const computedValue = vm.currentProgress;
    expect(computedValue).to.equal(113.0976)
  })

  it('should render correct values', (done) => {
    const vm = getRenderedComponent(ProgressCircle, { value : 10});

    expect(vm.value).to.equal(10);
    expect(vm.$el.querySelector('.fip-loading').textContent.trim()).to.equal('10.0%');
    expect(vm.$el.querySelector('.fip-circular-overlay').getAttribute('stroke-dashoffset')).to.equal('113.0976');

    vm.value = 40;
    
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.fip-loading').textContent.trim()).to.equal('40.0%');
      expect(vm.$el.querySelector('.fip-circular-overlay').getAttribute('stroke-dashoffset')).to.equal('75.3984');
      done();
    })
  });
  
})