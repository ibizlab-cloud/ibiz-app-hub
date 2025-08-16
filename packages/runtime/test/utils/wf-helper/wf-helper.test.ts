import { IAppView } from '@ibiz/model-core'
import { WFLink } from '../../../src/interface'
import { getWFContext, getWFSubmitViewId } from '../../../src/utils/wf-helper/wf-helper'
import { describe, expect, test, vi, } from 'vitest'

describe('wf-helper', () => {
    test('传入对象中有param09值', () => {
        const data = { param09: 'test' }
        expect(getWFContext(data)).toEqual({ srfprocessinstanceid: 'test' })
    })

    test('传入对象中没有param09值', () => {
        const data = { param: 'test' }
        expect(getWFContext(data)).toEqual({})
    })

    test('根据流程操作类型,找到引用视图id', () => {
        const view: IAppView = {
            id: 'view1',
            name: 'View 1',
            appViewRefs: [
                { name: 'WFUTILACTION@TYPE1', refAppViewId: 'view2', appId: '' },
                { name: 'WFACTION@VIEWA', refAppViewId: 'view3', appId: '' },
                { name: 'WFACTION@VIEWB', refAppViewId: 'view4', appId: '' },
            ],
            appId: ''
        };

        const link: WFLink = {
            type: 'Type1',
            sequenceflowview: 'VIEWA',
            sequenceflowmobview: 'VIEWB',
            sequenceFlowName: '',
            sequenceflowform: '',
            sequenceflowmobform: '',
            sequenceFlowId: '',
            id: ''
        };
        const submitViewId = getWFSubmitViewId(view, link);
        expect(submitViewId).toEqual('view2');
    });

    test('没有流程操作类型,pc端根据sequenceflowview,找到引用视图', () => {
        const view: IAppView = {
            id: 'view1',
            name: 'View 1',
            appViewRefs: [
                { name: 'WFUTILACTION@TYPE1', refAppViewId: 'view2', appId: '' },
                { name: 'WFACTION@VIEWA', refAppViewId: 'view3', appId: '' },
                { name: 'WFACTION@VIEWB', refAppViewId: 'view4', appId: '' },
            ],
            appId: ''
        };

        const link: WFLink = {
            type: 'Type1',
            sequenceflowview: 'VIEWA',
            sequenceflowmobview: 'VIEWB',
            sequenceFlowName: '',
            sequenceflowform: '',
            sequenceflowmobform: '',
            sequenceFlowId: '',
            id: ''
        };
        const newLink = { ...link, type: undefined };
        const submitViewId = getWFSubmitViewId(view, newLink);
        expect(submitViewId).toEqual('view3');
    });

    test('没有流程操作类型,移动端根据sequenceflowmobview,找到引用视图', () => {
        const view: IAppView = {
            id: 'view1',
            name: 'View 1',
            appViewRefs: [
                { name: 'WFUTILACTION@TYPE1', refAppViewId: 'view2', appId: '' },
                { name: 'WFACTION@VIEWA', refAppViewId: 'view3', appId: '' },
                { name: 'WFACTION@VIEWB', refAppViewId: 'view4', appId: '' },
            ],
            appId: ''
        };

        const link: WFLink = {
            type: 'Type1',
            sequenceflowview: 'VIEWA',
            sequenceflowmobview: 'VIEWB',
            sequenceFlowName: '',
            sequenceflowform: '',
            sequenceflowmobform: '',
            sequenceFlowId: '',
            id: ''
        };
        const newLink = { ...link, type: undefined };
        vi.spyOn(ibiz.env, 'isMob', 'get').mockReturnValueOnce(true); // ibiz.env.isMob => true
        const submitViewId = getWFSubmitViewId(view, newLink);
        expect(submitViewId).toEqual('view4');
    });

    test('没有流程操作类型,根据sequenceflowview或sequenceflowmobview,未找到引用视图', () => {
        const view: IAppView = {
            id: 'view1',
            name: 'View 1',
            appViewRefs: [
                { name: 'WFUTILACTION@TYPE1', refAppViewId: 'view2', appId: '' },
                { name: 'WFACTION@VIEWA', refAppViewId: 'view3', appId: '' },
                { name: 'WFACTION@VIEWB', refAppViewId: 'view4', appId: '' },
            ],
            appId: ''
        };

        const link: WFLink = {
            type: 'Type1',
            sequenceflowview: 'VIEWA',
            sequenceflowmobview: 'VIEWB',
            sequenceFlowName: '',
            sequenceflowform: '',
            sequenceflowmobform: '',
            sequenceFlowId: '',
            id: ''
        };

        const newLink = { ...link, type: undefined, sequenceflowview: 'VIEWX' };
        const submitViewId = getWFSubmitViewId(view, newLink);
        expect(submitViewId).toBeUndefined();
    });

})
