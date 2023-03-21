<template>
    <CRUDView :data-service="this.dataService" title="Courses" :isReadOnly="this.canEditCourseData()"/>
</template>

<script>
import ModelDataService from '@/services/models.data.service';
import CRUDView from './shared/CRUDView.vue';
import { actions } from "../../constants";
import httpCommonDataService from '@/services/http-common.data.service';

export default 
{
    components: {
        CRUDView
    },
    data() {
        return {
            dataService : ModelDataService.CourseDataService,
        }   
    },
    methods: {
    }
    
}
</script>