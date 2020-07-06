<template>
    <div :class="[drag?'drag-wrap':'']">
        <div :class="['group-wrap', bordered? 'border-wrap':'']" v-for="key in keys" :key="key">
            <div class="item" v-if="param1&&!getUnVisible(1)">
                <slot name="param1" :index="key - 1" :innerValue="paramsList[key - 1][param1]" :paramName="param1">
                    <a-input
                            :disabled="disabled"
                            :value="paramsList[key - 1][param1]"
                            :placeholder="placeholder1"
                            @change="handleChange(key - 1, $event, param1)"
                    ></a-input>
                </slot>
            </div>
            <div class="item" v-if="param2&&!getUnVisible(2)">
                <slot name="param2" :index="key - 1" :innerValue="paramsList[key - 1][param2]" :paramName="param2">
                    <a-input
                            class="item"
                            :disabled="disabled"
                            :placeholder="placeholder2"
                            @change="handleChange(key - 1, $event, param2)"
                            :value="paramsList[key - 1][param2]"
                    ></a-input>
                </slot>
            </div>
            <div class="item" v-if="param3&&!getUnVisible(3)">
                <slot name="param3" :index="key - 1" :innerValue="paramsList[key - 1][param3]" :paramName="param3">
                    <a-input
                            :disabled="disabled"
                            class="item"
                            :placeholder="placeholder3"
                            @change="handleChange(key - 1, $event, param3)"
                            :value="paramsList[key - 1][param3]"
                    ></a-input>
                </slot>
            </div>
            <div class="item" v-if="param4&&!getUnVisible(4)">
                <slot name="param4" :index="key - 1" :innerValue="paramsList[key - 1][param4]" :paramName="param4">
                    <a-input
                            :disabled="disabled"
                            class="item"
                            :placeholder="placeholder4"
                            @change="handleChange(key - 1, $event, param4)"
                            :value="paramsList[key - 1][param4]"
                    ></a-input>
                </slot>
            </div>
            <div class="item" v-if="param5&&!getUnVisible(5)">
                <slot name="param5" :index="key - 1" :innerValue="paramsList[key - 1][param5]" :paramName="param5">
                    <a-input
                            :disabled="disabled"
                            class="item"
                            :placeholder="placeholder5"
                            @change="handleChange(key - 1, $event, param5)"
                            :value="paramsList[key - 1][param5]"
                    ></a-input>
                </slot>
            </div>
            <!--      <div v-if="param3" class="gap-line">&#45;&#45;</div>-->

            <div v-if="!aline" class="remove-item" @click="onRemoveItem(key - 1)"><a-icon type="delete" /></div>
            <div v-if="!aline&&drag" class="drag-thumb" draggable="true"><a-icon type="drag" /></div>
            <div class="extra-line" v-if="dpsparam"><slot name="dpsparam" :index="key-1" :innerValue="paramsList[key -1][dpsparam]" :paramName="dpsparam"></slot></div>
        </div>
        <a-button type="dashed" v-if="!aline" block @click="onCreateItem">
            <a-icon type="plus" /> <slot name="btnName">添加</slot>
        </a-button>
    </div>
</template>

<script>
    let target;
    export default {
        props: [
            'value',
            'only', // 是否只显示一行，且没有添加
            'drag', // 是否支持拖拽排序
            'param1',
            'param2',
            'param3',
            'param4',
            'param5',
            'dpsparam',
            'disabled',
            'bordered',
            'placeholder1',
            'placeholder2',
            'placeholder3',
            'placeholder4',
            'placeholder5',
            'UnVisibleArr', // 动态不显示[1,2,3,4,5]
        ],
        data() {
            const value = this.value || [];
            return {
                keys: value.length,
                paramsList: value || [],
                // 是否只显示一行
                aline: this.only !== undefined,
                // param1: "attributeName",
                // param2: "attributeValue"
            };
        },
        name: 'ParamsInput',
        computed: {
            getUnVisible() {
                return (i) => {
                    if (this.UnVisibleArr) {
                        return this.UnVisibleArr.includes(i);
                    }
                    return false;
                };
            },
        },
        watch: {
            value(val = []) {
                this.paramsList = val || [];
                this.keys = this.paramsList.length;
            },
            disabled(val = false) {
                if (Object.prototype.toString.call(val).includes('Boolean')) {
                    this.disabled = val;
                } else {
                    this.disabled = false;
                }
            },
        },
        mounted() {
            if (this.drag) {
                this.onDragMethod();
            }
        },
        methods: {
            onDragMethod() {
                const dropbox = [].slice.call(document.querySelectorAll('.drag-wrap'));
                dropbox.forEach(item => {
                    item.addEventListener('dragstart', function (event){
                        target = event.target.parentNode;
                    })
                    item.addEventListener('dragover', function (event) {
                        event.preventDefault();
                    })
                    item.addEventListener('drop', function(event) {
                        event.stopPropagation();
                        event.preventDefault();
                        let currentTarget;
                        [].slice.call(event.currentTarget.querySelectorAll('.group-wrap')).forEach(res => {
                            const rectRange = res.getBoundingClientRect()
                            if (event.y >= rectRange.y &&event.y <= rectRange.y + rectRange.height ) {
                                currentTarget = res;
                            }
                        })
                        if (currentTarget) {
                            const rect = currentTarget.getBoundingClientRect();
                            const y = rect.y + rect.height/2;
                            switch (target.compareDocumentPosition(currentTarget)) {
                                case 2:
                                    if (y > event.y) {
                                        currentTarget.before(target);
                                    } else {
                                        currentTarget.after(target);
                                    }
                                    break;
                                case 4:
                                    if (y > event.y) {
                                        currentTarget.before(target);
                                    } else {
                                        currentTarget.after(target);
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    })

                })
            },
            onCreateItem() {
                this.keys = this.keys + 1;
                const obj = {};
                this.paramsList.push(obj);
                // if (this.drag) {
                //     this.onDragMethod();
                // }
            },
            onRemoveItem(k) {
                const paramsList = [...this.paramsList];
                paramsList.splice(k, 1);
                this.triggerChange(paramsList);
                this.keys = this.keys - 1;
                // if (this.drag) {
                //     this.onDragMethod();
                // }
            },
            handleChange(key, event, paramName) {
                const paramsList = [...this.paramsList];
                paramsList[key][paramName] = event.target.value;
                this.triggerChange(paramsList);
            },
            // 外部使用
            handleValueChange(key, value, paramName) {
                const paramsList = [...this.paramsList];
                paramsList[key][paramName] = value;
                this.triggerChange(paramsList);
            },
            // 外部使用-列改变
            handleColumnValueChange(key, value, paramName, otherValue = undefined) {
                const paramsList = [...this.paramsList];
                paramsList.forEach((item) => {
                    item[paramName] = otherValue;
                });
                paramsList[key][paramName] = value.target.checked;
                this.triggerChange(paramsList);
            },
            triggerChange(changedValue) {
                this.$emit('change', changedValue);
            },
        },
    };
</script>

<style scoped>
    .group-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .item {
        flex: 1;
    }
    .item + .item {
        margin-left: 45px;
    }
    .gap-line {
        flex: none;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item + .item::before {
        content: "--";
        position: absolute;
        width: 40px;
        font-size: 14px;
        margin-left: -28px;
    }
    .remove-item {
        flex: none;
        width: 45px;
        text-align: center;
        cursor: pointer;
    }
    .drag-thumb{
        flex: none;
        width: 45px;
        text-align: center;
        cursor: pointer;
    }
    .extra-line{
        width: 100%;
    }
    .border-wrap{
        border-width: 1px;
        border-style: solid;
        border-radius: 5px;
        border-color: #e8e8e8;
        padding: 10px;
        margin: 0 0 16px;
    }
</style>
