import Vue from 'vue';
import Footer from '@/components/Footer';
import { getRenderedComponent } from '../helper';

describe('Footer.vue', () => {
    it('should render text content', ()=>{
        const vm = getRenderedComponent(Footer, { maxSize : 10, allowFiles : '.jpg'});

        //Check classnames
        expect(vm.$el.getAttribute('class')).to.equal('fip-footer');
        expect(vm.$el.querySelector('#fip-footer-max-info').getAttribute('class')).to.equal('fip-footer-info');
        expect(vm.$el.querySelector('#fip-footer-file-type-info').getAttribute('class')).to.equal('fip-footer-info');
        expect(vm.$el.querySelector('img').getAttribute('class')).to.equal('fip-logo-single');

        //Content
        const innerTextMaxSize = vm.$el.querySelector('#fip-footer-max-info').textContent.trim();
        const innerTextFileTypes = vm.$el.querySelector('#fip-footer-file-type-info').textContent.trim();

        expect(innerTextMaxSize).to.equal('Maximum upload size per file: 0.01MB');
        expect(innerTextFileTypes).to.equal('Allowed file types: .jpg');
    })

    it('should hide max file info text if file size unlimited', ()=>{
        const vm = getRenderedComponent(Footer, { maxSize : 0});
        expect(vm.$el.querySelector('#fip-footer-file-type-info')).to.be.null;
    })

    it('should hide filte type info text if allowed all types', ()=>{
        const vm = getRenderedComponent(Footer, { allowFiles : "*"});
        expect(vm.$el.querySelector('#fip-footer-file-type-info')).to.be.null;
    })
})