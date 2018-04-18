import Vue from 'vue';
import Header from '@/components/Header';
import { en } from '@/languages';
import { getRenderedComponent } from '../helper';

describe('Header.vue', () => {
    it('should render text content', ()=>{
        const vm = getRenderedComponent(Header);

        //Check classnames
        expect(vm.$el.getAttribute('class')).to.equal('fip-header');
        expect(vm.$el.querySelector('h1').getAttribute('class')).to.equal('fip-header-title');

        //Content
        const innerText = vm.$el.querySelector('h1').textContent.trim();
        expect(innerText).to.equal(en.header.uploadFiles);
    })
})