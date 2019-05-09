module Pd::SurveyPipeline
  class TransformerBase
    def self.transform_data(*)
      raise 'Child class must override this method'
    end
  end

  class WorkshopDailySurveyFlattenTransformer < TransformerBase
    # Split and join WorkshopDailySurvey and SurveyQuestion data.
    # @param data [Hash] the input data contains WorkshopDailySurvey and SurveyQuestion
    # @return [Array<Hash{FieldKey => FieldValue}>] array of results after join
    def self.transform_data(data:, logger: nil)
      return unless data.dig(:workshop_daily_surveys)
      return unless data.dig(:survey_questions)

      # Create question mapping: [form_id, qid] => q_content
      questions = {}
      data[:survey_questions].each do |sq|
        q_arr = JSON.parse(sq.questions)
        logger&.info "TR: survey form_id #{sq.form_id} has #{q_arr.count} questions"

        q_arr.each do |q|
          q_key = {form_id: sq.form_id, id: q["id"].to_s}
          questions[q_key] = q.symbolize_keys   #{type: q["type"], name: q["name"], text: q["text"]}
        end
      end

      logger&.info "TR: questions.count = #{questions.count}"
      logger&.debug "TR: questions = #{questions}"

      # Split answers into rows and add question content for each row
      res = []
      data[:workshop_daily_surveys].each do |sub|
        next unless sub.answers
        ans_h = JSON.parse(sub.answers)
        logger&.info "TR: submission id #{sub.id} has #{ans_h.count} answers"

        ans_h.each do |qid, ans|
          q_key = {form_id: sub.form_id, id: qid.to_s}
          raise "Question id #{qid} in form #{form_id} does not exist in SurveyQuestion data" unless questions.key?(q_key)

          # TODO: add session_id for future grouping? Configure columns to choose from input
          res << {workshop_id: sub.pd_workshop_id, form_id: sub.form_id, submission_id: sub.id, answer: ans, qid: qid}.merge(questions[q_key])
        end
      end

      logger&.info "TR: answer count = #{res.count}"
      logger&.debug "TR: first 10 answers = #{res[0..9]}"
      res
    end
  end
end

__END__

class WorkshopDailySurveyTransformer < TransformerBase
  def self.transform_data(data: {}, debug: false)
    return unless data.dig(:workshop_daily_surveys)
    return unless data.dig(:survey_questions)

    res = {}
    data[:survey_questions].each do |sq|
      q_arr = JSON.parse(sq.questions)
      q_arr.each do |q|
        q_key = {name: q["id"].to_s, type: q["type"]}
        res[q_key] ||= []
      end
    end

    p "res ater extracting questions = #{res}" if debug

    data[:workshop_daily_surveys].each do |sub|
      ans_h = JSON.parse(sub.answers)
      ans_h.each do |qid, ans|
        qid_str = qid.to_s

        found = false
        res.each_key do |key|
          next if key[:name] != qid_str

          res[key] << {form_id: sub.form_id, workshop_id: sub.pd_workshop_id, ans: ans}
          found = true
          break
        end

        raise "Question id #{qid} does not exist in SurveyQuestion data" unless found
      end
    end

    p "Result ater extracting answers = #{res}" if debug
    return res
  end
end
