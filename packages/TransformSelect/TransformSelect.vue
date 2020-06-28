<template>
    <div>
        <a-select
                :value="targetKeys"
                mode="tags"
                :disabled="disabled"
                placeholder="请选择车型"
                @deselect="cancelSelect"
                @change="selectChange"
                :open="open"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode"
                @dropdownVisibleChange="showTransfer"
        >
            <div slot="dropdownRender">
                <a-transfer
                        class="g-col-3-center"
                        :data-source="mockData"
                        :disabled="disabled"
                        :lazy="false"
                        show-search
                        :listStyle="{width: '100%'}"
                        :locale="{
                 itemUnit: '项', itemsUnit: '项', notFoundContent: '列表为空', searchPlaceholder: '请输入搜索内容'
            }"
                        :filter-option="filterOption"
                        :target-keys="targetKeys"
                        :render="item => item.title"
                        @change="handleChange"
                />
                <div style="direction: rtl; margin-top:8px;">
                    <a-button type="primary" @click="hideTransfer">确定</a-button>
                </div>
            </div>
        </a-select>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            value: {
                type: Array,
            },
            disabled: {
                type: Boolean,
                default: true,
            },
        },
        data() {
            return {
                mockData: [],
                targetKeys: [],
                open: false,
                carType: [],
            };
        },
        watch: {
            value(val = []) {
                this.targetKeys = val;
            },
        },
        mounted() {
            this.getMock();
        },
        methods: {
            showTransfer() {
                this.open = true;
            },
            hideTransfer() {
                this.open = false;
            },
            cancelSelect(value) {
                this.targetKeys = this.targetKeys.filter(item => item !== value);
            },
            getMock() {
                this.getDictList({ typeCode: 'CAR_TYPE' }).then((req) => {
                    this.carType = req.data.dicts;
                    const mockData = this.carType.map(x => ({
                        key: x.name,
                        title: x.name,
                        description: x.name,
                        chosen: false,
                    }));
                    this.mockData = mockData;
                });
            },
            filterOption(inputValue, option) {
                return option.description.indexOf(inputValue) > -1;
            },
            handleChange(targetKeys) {
                this.targetKeys = targetKeys;
                this.$emit('change', targetKeys);
            },
            selectChange(targetKeys) {
                this.$emit('change', targetKeys);
            },
            ...mapActions('views/dataDictionary', ['getDictList']),
        },
    };
</script>
<style scoped>
    .g-col-3-center{
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
    }
    #carType .ant-select-dropdown-content{
        padding:16px;
    }
    #carType{
        padding-right:1em;
    }
</style>
